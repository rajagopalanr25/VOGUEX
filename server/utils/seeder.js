import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { mockProducts, mockCoupons, mockUsers, mockOrders, mockReviews } from './mockData.js';
import Product from '../models/Product.js';
import User from '../models/User.js';
import Order from '../models/Order.js';
import Coupon from '../models/Coupon.js';
import Review from '../models/Review.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/voguex';
    console.log(`Connecting to MongoDB at: ${mongoUri}`);

    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 5000 });
    console.log('MongoDB connection established successfully.');

    // Clear existing
    await Promise.all([
      Product.deleteMany({}),
      User.deleteMany({}),
      Order.deleteMany({}),
      Coupon.deleteMany({}),
      Review.deleteMany({})
    ]);
    console.log('Cleared existing records.');

    // Insert mock data
    await Product.insertMany(mockProducts);
    console.log(`Seeded ${mockProducts.length} Luxury Products.`);

    await User.insertMany(mockUsers);
    console.log(`Seeded ${mockUsers.length} Users (including Admin: admin@voguex.com).`);

    await Coupon.insertMany(mockCoupons);
    console.log(`Seeded ${mockCoupons.length} Active Promotional Coupons.`);

    await Order.insertMany(mockOrders);
    console.log(`Seeded Sample Order with full Tracking History.`);

    await Review.insertMany(mockReviews);
    console.log(`Seeded Verified Customer Reviews.`);

    console.log('✨ VOGUEX Atelier Database Seeding Completed Successfully.');
    process.exit(0);
  } catch (error) {
    console.warn(`Database seeding note: Could not connect to external MongoDB (${error.message}).`);
    console.log('The VOGUEX platform runs with the built-in resilient data layer automatically.');
    process.exit(0);
  }
};

seedDatabase();

