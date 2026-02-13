import { Router } from 'express';
import { estimateTrip, saveTrip, getTripsByUser } from '../controllers/tripController';

const router = Router();

router.post('/estimate', estimateTrip);
router.post('/', saveTrip);
router.get('/user/:userId', getTripsByUser);

export default router;
