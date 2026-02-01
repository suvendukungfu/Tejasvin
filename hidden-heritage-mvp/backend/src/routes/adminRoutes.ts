import { Router } from 'express';
import { getAdminStats, getReviews, deleteReview, getPayouts, processPayout } from '../controllers/adminController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

// In real app, add checkRole('admin') middleware
router.get('/stats', authenticateToken, getAdminStats);
router.get('/reviews', authenticateToken, getReviews);
router.delete('/reviews/:id', authenticateToken, deleteReview);
router.get('/payouts', authenticateToken, getPayouts);
router.post('/payouts/process', authenticateToken, processPayout);

export default router;
