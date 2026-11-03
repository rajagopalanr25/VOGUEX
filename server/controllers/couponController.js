import { store } from '../utils/dataStore.js';

export const validateCoupon = async (req, res) => {
  try {
    const { code, cartTotal } = req.body;

    if (!code) {
      return res.status(400).json({ message: 'Coupon code is required' });
    }

    const coupon = store.getCoupon(code);
    if (!coupon) {
      return res.status(404).json({ message: 'Invalid or expired promotional code' });
    }

    const total = Number(cartTotal) || 0;
    if (total < coupon.minOrderValue) {
      return res.status(400).json({
        message: `This coupon requires a minimum cart total of $${coupon.minOrderValue}`
      });
    }

    let discount = 0;
    if (coupon.discountPercentage > 0) {
      discount = Math.min((total * coupon.discountPercentage) / 100, coupon.maxDiscount);
    } else if (coupon.discountAmount > 0) {
      discount = Math.min(coupon.discountAmount, total);
    }

    res.json({
      success: true,
      code: coupon.code,
      description: coupon.description,
      discount: Math.round(discount * 100) / 100,
      minOrderValue: coupon.minOrderValue
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCoupons = async (req, res) => {
  try {
    res.json(store.coupons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCoupon = async (req, res) => {
  try {
    const { code, description, discountPercentage, discountAmount, minOrderValue, maxDiscount } = req.body;
    const newCoupon = {
      _id: `cpn_${Date.now()}`,
      code: code.toUpperCase(),
      description: description || 'Promotional Discount',
      discountPercentage: Number(discountPercentage) || 0,
      discountAmount: Number(discountAmount) || 0,
      minOrderValue: Number(minOrderValue) || 0,
      maxDiscount: Number(maxDiscount) || 500,
      isActive: true,
      usageCount: 0
    };
    store.coupons.push(newCoupon);
    res.status(201).json(newCoupon);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

