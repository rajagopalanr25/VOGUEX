import { store } from '../utils/dataStore.js';

export const getDashboardStats = async (req, res) => {
  try {
    const orders = store.orders;
    const products = store.products;
    const users = store.users.filter(u => u.role === 'customer');

    const totalRevenue = orders
      .filter(o => o.isPaid)
      .reduce((sum, o) => sum + o.totalPrice, 0);

    const pendingOrders = orders.filter(o => ['Order Placed', 'Payment Confirmed', 'Processing', 'Packed'].includes(o.status)).length;
    const shippedOrders = orders.filter(o => o.status === 'Shipped' || o.status === 'Out for Delivery').length;
    const deliveredOrders = orders.filter(o => o.status === 'Delivered').length;
    const cancelledOrders = orders.filter(o => o.status === 'Cancelled').length;

    // Monthly revenue simulation data for luxury charts
    const monthlySales = [
      { month: 'Jun', revenue: 14200, orders: 28 },
      { month: 'Jul', revenue: 18500, orders: 36 },
      { month: 'Aug', revenue: 22400, orders: 42 },
      { month: 'Sep', revenue: 29100, orders: 55 },
      { month: 'Oct', revenue: 38200, orders: 68 },
      { month: 'Nov', revenue: totalRevenue + 12000, orders: orders.length + 15 }
    ];

    const topSellingProducts = products.slice(0, 5).map(p => ({
      _id: p._id,
      name: p.name,
      price: p.price,
      image: p.images[0],
      salesCount: Math.floor(25 + Math.random() * 80),
      stockCount: p.stockCount
    }));

    res.json({
      totalRevenue: Math.round(totalRevenue * 100) / 100,
      totalOrders: orders.length,
      totalCustomers: users.length,
      totalProducts: products.length,
      pendingOrders,
      shippedOrders,
      deliveredOrders,
      cancelledOrders,
      monthlySales,
      topSellingProducts,
      recentOrders: orders.slice(0, 6)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const { status, search } = req.query;
    let orders = [...store.orders];

    if (status && status !== 'All') {
      orders = orders.filter(o => o.status.toLowerCase() === status.toLowerCase());
    }

    if (search) {
      const q = search.toLowerCase();
      orders = orders.filter(o => 
        o.orderId.toLowerCase().includes(q) ||
        o.shippingAddress.fullName.toLowerCase().includes(q) ||
        o.guestEmail?.toLowerCase().includes(q)
      );
    }

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status, notes } = req.body;

    const validStatuses = [
      'Order Placed',
      'Payment Confirmed',
      'Processing',
      'Packed',
      'Shipped',
      'Out for Delivery',
      'Delivered',
      'Cancelled',
      'Return Requested',
      'Returned',
      'Refund Processing',
      'Refunded'
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid order status transition' });
    }

    const updated = store.updateOrderStatus(orderId, status, notes);
    if (!updated) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Broadcast live event to all connected tracking clients via Socket.IO
    if (req.app.get('io')) {
      req.app.get('io').emit('order:status_updated', {
        orderId: updated._id,
        systemOrderId: updated.orderId,
        status: updated.status,
        timestamp: new Date().toISOString(),
        notes: notes || `Order updated to ${status}`
      });
    }

    res.json({
      success: true,
      message: `Order status successfully transitioned to ${status}`,
      order: updated
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllCustomers = async (req, res) => {
  try {
    const customers = store.users.map(u => ({
      _id: u._id,
      name: u.name,
      email: u.email,
      role: u.role,
      phone: u.phone,
      orderCount: store.orders.filter(o => o.user === u._id).length,
      createdAt: u.createdAt
    }));
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

