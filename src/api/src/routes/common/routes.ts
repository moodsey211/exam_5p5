import { Router } from 'express';
import notFound from './notfound';
import errorHandling from './errorhandling';

const router = Router();

router.use(notFound);
router.use(errorHandling);

export default router;