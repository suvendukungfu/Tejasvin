import { Router } from 'express';
import { getAdminStats, getReviews, deleteReview, getPayouts, processPayout } from '../controllers/adminController';
import { authenticateToken } from '../middleware/authMiddleware';
import { requireRole } from '../middleware/roleMiddleware';

const router = Router();

// Apply role-based access control: Admin only
router.get('/stats', authenticateToken, requireRole('admin'), getAdminStats);
router.get('/reviews', authenticateToken, requireRole('admin'), getReviews);
router.delete('/reviews/:id', authenticateToken, requireRole('admin'), deleteReview);
router.get('/payouts', authenticateToken, requireRole('admin'), getPayouts);
router.post('/payouts/process', authenticateToken, requireRole('admin'), processPayout);

export default router;
