import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/rescue_network_v2');
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err: any) {
        console.error(`Error: ${err.message}`);
        process.exit(1);
    }
};
