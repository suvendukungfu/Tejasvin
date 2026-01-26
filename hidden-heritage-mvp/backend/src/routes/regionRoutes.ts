import { Router } from 'express';
import { getRegions, getRegionBySlug } from '../controllers/regionController';

const router = Router();

router.get('/', getRegions);
router.get('/:slug', getRegionBySlug);

export default router;
