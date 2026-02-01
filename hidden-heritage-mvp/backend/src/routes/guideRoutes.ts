import { Router } from 'express';
import { getGuides } from '../controllers/guideController';

const router = Router();

router.get('/', getGuides);

export default router;
