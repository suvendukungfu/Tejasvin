import { Router } from 'express';
import { getHotspots, getStats } from './controllers/AnalyticsController';
// import { protect, authorize } from '../../../shared/middlewares/auth';

const router = Router();

// Public for now for demo visualization, or protect if needed
// router.use(protect);

router.get('/hotspots', getHotspots);
router.get('/stats', getStats);

export default router;
