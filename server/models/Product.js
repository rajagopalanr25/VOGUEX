import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    brand: { type: String, default: 'VOGUEX Atelier' },
    description: { type: String, required: true },
    details: [{ type: String }],
    category: { type: String, required: true },
    subcategory: { type: String },
    gender: { type: String, enum: ['Men', 'Women', 'Kids', 'Unisex'], default: 'Unisex' },
    price: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    images: [{ type: String }],
    colors: [
      {
        name: { type: String },
        hex: { type: String },
        image: { type: String }
      }
    ],
    sizes: [
      {
        size: { type: String },
        stock: { type: Number, default: 10 }
      }
    ],
    rating: { type: Number, default: 4.8 },
    numReviews: { type: Number, default: 12 },
    isNewArrival: { type: Boolean, default: false },
    isBestSeller: { type: Boolean, default: false },
    isTrending: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    isLimitedEdition: { type: Boolean, default: false },
    inStock: { type: Boolean, default: true },
    stockCount: { type: Number, default: 50 },
    model3dType: { type: String, default: 'mannequin' }, // mannequin, sneaker, blazer, dress, hoodie, watch
    materials: { type: String, default: '100% Organic Italian Cotton & Silk' },
    careInstructions: { type: String, default: 'Dry clean only or gentle cold wash' }
  },
  { timestamps: true }
);

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;

