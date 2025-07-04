import { Router } from 'express';
import getSummary from './summary';
import listOrders from './listorders';
import createOrder from './createorder';
import deleteOrder from './deleteorder';
import { createValidation, listValidation } from '../../validations/orders';
import { validate } from '../../middleware/validator';

const router = Router();

router.get('/summary', getSummary);
router.get('/orders', validate(listValidation), listOrders);
router.post('/orders', validate(createValidation), createOrder);
router.delete('/orders/:id', deleteOrder);

export default router;