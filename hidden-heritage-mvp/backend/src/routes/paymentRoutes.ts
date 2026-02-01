import { Router } from 'express';
import { createPaymentIntent, confirmPayment } from '../controllers/paymentController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.post('/create-intent', authenticateToken, createPaymentIntent);
router.post('/confirm', authenticateToken, confirmPayment);

export default router;
