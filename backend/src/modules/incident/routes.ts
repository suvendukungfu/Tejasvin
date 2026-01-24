import { Router } from 'express';
import { IncidentController } from './controllers/IncidentController';
import { auth } from '../../shared/middlewares/auth';

const router = Router();
const incidentController = new IncidentController();

router.get('/', auth, (req, res) => incidentController.getActive(req, res));
router.post('/', auth, (req, res) => incidentController.create(req, res));
router.put('/:id/vitals', auth, (req, res) => incidentController.updateVitals(req, res));

export default router;
