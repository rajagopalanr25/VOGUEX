import { store } from '../utils/dataStore.js';

export const createOrder = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      couponCode
    } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'Cart is empty. No items to order.' });
    }

    if (!shippingAddress || !shippingAddress.street || !shippingAddress.city) {
      return res.status(400).json({ message: 'Valid shipping address is required.' });
    }

    // Server-side calculation to ensure tampering cannot occur
    let calculatedItemsPrice = 0;
    const validatedItems = [];

    for (const item of orderItems) {
      const dbProduct = store.getProductById(item.product || item._id);
      if (!dbProduct) {
        return res.status(400).json({ message: `Product ${item.name || item.product} not found.` });
      }

      const itemPrice = dbProduct.price;
      const quantity = Math.max(1, Number(item.quantity) || 1);
      calculatedItemsPrice += itemPrice * quantity;

      validatedItems.push({
        product: dbProduct._id,
        name: dbProduct.name,
        image: dbProduct.images[0],
        price: itemPrice,
        size: item.size || 'M',
        color: item.color || (dbProduct.colors[0]?.name || 'Standard'),
        quantity
      });
    }

    // Coupon verification
    let discountPrice = 0;
    let validCoupon = null;
    if (couponCode) {
      const foundCoupon = store.getCoupon(couponCode);
      if (foundCoupon && calculatedItemsPrice >= foundCoupon.minOrderValue) {
        if (foundCoupon.discountPercentage > 0) {
          discountPrice = Math.min((calculatedItemsPrice * foundCoupon.discountPercentage) / 100, foundCoupon.maxDiscount);
        } else if (foundCoupon.discountAmount > 0) {
          discountPrice = Math.min(foundCoupon.discountAmount, calculatedItemsPrice);
        }
        validCoupon = foundCoupon.code;
      }
    }

    // Shipping & Tax calculations
    const shippingPrice = calculatedItemsPrice > 200 ? 0 : 25;
    const taxableSubtotal = Math.max(0, calculatedItemsPrice - discountPrice);
    const taxPrice = Math.round(taxableSubtotal * 0.08 * 100) / 100; // 8% luxury sales tax
    const totalPrice = Math.round((taxableSubtotal + taxPrice + shippingPrice) * 100) / 100;

    const orderData = {
      user: req.user ? req.user._id : null,
      guestEmail: req.body.guestEmail || (req.user ? req.user.email : 'guest@voguex.com'),
      orderItems: validatedItems,
      shippingAddress,
      paymentMethod: paymentMethod || 'Razorpay',
      itemsPrice: calculatedItemsPrice,
      taxPrice,
      shippingPrice,
      discountPrice,
      couponApplied: validCoupon || '',
      totalPrice,
      isPaid: false,
      status: 'Order Placed'
    };

    const newOrder = store.createOrder(orderData);
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = store.getOrders(req.user._id);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = store.getOrderById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found in records' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const trackOrderByQuery = async (req, res) => {
  try {
    const { id } = req.params;
    const order = store.getOrderById(id) || store.orders.find(o => o.trackingNumber === id);
    if (!order) {
      return res.status(404).json({ message: 'No shipment found matching that Order ID or Tracking Number' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const cancelOrder = async (req, res) => {
  try {
    const order = store.getOrderById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (['Shipped', 'Out for Delivery', 'Delivered'].includes(order.status)) {
      return res.status(400).json({ message: 'Order has already left the atelier and cannot be cancelled directly.' });
    }

    const updated = store.updateOrderStatus(order._id, 'Cancelled', 'Order cancelled by customer.');
    res.json({ message: 'Order has been cancelled successfully', order: updated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

