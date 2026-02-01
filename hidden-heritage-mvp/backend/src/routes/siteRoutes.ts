import { Router } from 'express';
import { getSites, getSiteBySlug } from '../controllers/siteController';

const router = Router();

router.get('/', getSites);
router.get('/:slug', getSiteBySlug);

export default router;
