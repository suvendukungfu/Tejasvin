import { Router } from 'express';
import { estimateTrip, saveTrip } from '../controllers/tripController';

const router = Router();

router.post('/estimate', estimateTrip);
router.post('/', saveTrip);

export default router;
