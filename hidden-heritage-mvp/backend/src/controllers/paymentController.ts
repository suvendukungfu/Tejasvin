import { Request, Response } from 'express';
import { mysqlPool as db } from '../config/mysql';

export const createPaymentIntent = async (req: any, res: Response) => {
    try {
        const { tripId, amount } = req.body;
        const userId = req.user.id;

        // In a real app, call Stripe API here.
        // For MVP, we simulate success.



        // Mock response
        const mockIntent = {
            client_secret: 'mock_secret_' + Math.random().toString(36).substring(7),
            amount: amount,
            currency: 'inr'
        };

        // Record pending payment
        await db.query(
            'INSERT INTO payments (user_id, trip_id, amount, status) VALUES (?, ?, ?, ?)',
            [userId, tripId, amount, 'pending']
        );

        res.json(mockIntent);

    } catch (error) {
        res.status(500).json({ message: 'Payment Error', error });
    }
};

export const confirmPayment = async (req: any, res: Response) => {
    try {
        const { tripId, paymentId } = req.body;
        // Verify with Stripe

        // Update DB
        await db.query('UPDATE payments SET status = ? WHERE trip_id = ?', ['succeeded', tripId]);
        await db.query('UPDATE trips SET status = ? WHERE id = ?', ['confirmed', tripId]);

        res.json({ success: true, message: 'Payment confirmed & Trip booked!' });
    } catch (error) {
        res.status(500).json({ message: 'Confirmation Error' });
    }
};
