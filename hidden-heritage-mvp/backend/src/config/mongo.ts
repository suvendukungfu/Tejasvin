import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/hidden_heritage';

export const connectMongo = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB Connected successfully');
    } catch (error) {
        console.error('MongoDB Connection failed:', error);
        throw error;
    }
};
