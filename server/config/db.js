import mongoose from 'mongoose';

let isMongoConnected = false;

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/voguex', {
      serverSelectionTimeoutMS: 2000,
    });
    isMongoConnected = true;
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`[Database] Notice: External MongoDB not reachable (${error.message}).`);
    console.log(`[Database] Activating High-Performance In-Memory & File-Backed Data Layer for zero-setup execution.`);
    isMongoConnected = false;
    return false;
  }
};

export const getDBStatus = () => isMongoConnected;

