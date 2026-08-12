import mongoose from 'mongoose';
import "dotenv/config";

const PORT = process.env.PORT || 3000;

const MONGODB_URI = process.env.MONGODB_URI

// Database Connection
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✓ MongoDB connected successfully');
  } catch (error) {
    console.error('✗ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

export default connectDB