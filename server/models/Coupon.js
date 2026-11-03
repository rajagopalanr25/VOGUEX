import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    description: { type: String, default: 'Exclusive VOGUEX Private Sale' },
    discountPercentage: { type: Number, default: 0 },
    discountAmount: { type: Number, default: 0 },
    minOrderValue: { type: Number, default: 0 },
    maxDiscount: { type: Number, default: 1000 },
    expiryDate: { type: Date, default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) },
    isActive: { type: Boolean, default: true },
    usageCount: { type: Number, default: 0 }
  },
  { timestamps: true }
);

const Coupon = mongoose.models.Coupon || mongoose.model('Coupon', couponSchema);
export default Coupon;

