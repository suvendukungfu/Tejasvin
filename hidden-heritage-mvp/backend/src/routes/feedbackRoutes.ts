import { Router } from 'express';
import { submitFeedback, getAllFeedbacks } from '../controllers/feedbackController';

const router = Router();

router.post('/', submitFeedback);
router.get('/', getAllFeedbacks);

export default router;
