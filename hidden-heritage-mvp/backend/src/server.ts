import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectMongo } from './config/mongo';
import { connectMysql } from './config/mysql';

import regionRoutes from './routes/regionRoutes';
import siteRoutes from './routes/siteRoutes';
import tripRoutes from './routes/tripRoutes';
import feedbackRoutes from './routes/feedbackRoutes';
import guideRoutes from './routes/guideRoutes';

import aiRoutes from './routes/aiRoutes';

import authRoutes from './routes/authRoutes';
import paymentRoutes from './routes/paymentRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes); // Auth
app.use('/api/regions', regionRoutes);
app.use('/api/sites', siteRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/payments', paymentRoutes); // Payments
app.use('/api/feedback', feedbackRoutes);
app.use('/api/guides', guideRoutes);
import adminRoutes from './routes/adminRoutes';
import { getSafetyScore } from './controllers/safetyController';

app.use('/api/admin', adminRoutes);
app.get('/api/safety/:siteId', getSafetyScore);

app.use('/api/ai', aiRoutes);

// Basic health check
app.get('/', (req, res) => {
    res.send('Hidden Heritage API is running');
});

// Start server
const startServer = async () => {
    try {
        await connectMysql();
        await connectMongo();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
