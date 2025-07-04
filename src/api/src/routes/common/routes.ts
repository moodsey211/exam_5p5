import { Router } from 'express';
import notFound from './notfound';

const router = Router();

router.use(notFound);

export default router;