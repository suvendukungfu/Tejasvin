import { Request, Response } from 'express';
import { mysqlPool as db } from '../config/mysql';

// Get Admin Stats
export const getAdminStats = async (req: Request, res: Response) => {
    try {
        // Simple counts
        const [users]: any = await db.query('SELECT COUNT(*) as count FROM users');
        const [trips]: any = await db.query('SELECT COUNT(*) as count FROM trips WHERE status = "confirmed"');
        const [revenue]: any = await db.query('SELECT SUM(amount) as total FROM payments WHERE status = "succeeded"');
        const [pendingPayouts]: any = await db.query('SELECT SUM(amount) as total FROM payouts WHERE status = "pending"');

        res.json({
            totalUsers: users[0].count,
            totalBookings: trips[0].count,
            totalRevenue: revenue[0].total || 0,
            pendingPayouts: pendingPayouts[0].total || 0,
            recentActivity: [] // Placeholder for list
        });
    } catch (error) {
        res.status(500).json({ message: 'Stats Error', error });
    }
};

// Reviews Moderation
export const getReviews = async (req: Request, res: Response) => {
    try {
        const [reviews]: any = await db.query(`
            SELECT r.*, u.name as user_name, s.name as site_name 
            FROM reviews r 
            JOIN users u ON r.user_id = u.id 
            JOIN sites s ON r.site_id = s.id
            ORDER BY r.created_at DESC
        `);
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Reviews Error' });
    }
};

export const deleteReview = async (req: Request, res: Response) => {
    try {
        await db.query('DELETE FROM reviews WHERE id = ?', [req.params.id]);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ message: 'Delete Error' });
    }
};

// Payouts
export const processPayout = async (req: Request, res: Response) => {
    try {
        const { payoutId } = req.body;
        // Mock processing logic
        await db.query('UPDATE payouts SET status = "processed", processed_at = NOW() WHERE id = ?', [payoutId]);
        res.json({ success: true, message: 'Payout Processed' });
    } catch (error) {
        res.status(500).json({ message: 'Payout Error' });
    }
};

export const getPayouts = async (req: Request, res: Response) => {
    try {
        const [payouts]: any = await db.query(`
            SELECT p.*, g.name as guide_name 
            FROM payouts p 
            JOIN guides g ON p.guide_id = g.id
            ORDER BY p.status DESC -- Pending first roughly
        `);
        res.json(payouts);
    } catch (error) {
        res.status(500).json({ message: 'Payouts Error' });
    }
};
