import { Router } from 'express';
import { getAiStory } from '../controllers/aiController';

const router = Router();

router.post('/story', getAiStory);

export default router;
