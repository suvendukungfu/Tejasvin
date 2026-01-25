import { Router } from 'express';
import { FeedbackController } from './controllers/FeedbackController';
import { auth } from '../../shared/middlewares/auth';

const router = Router();
const feedbackController = new FeedbackController();

router.post('/', auth, (req, res) => feedbackController.create(req, res));

export default router;
