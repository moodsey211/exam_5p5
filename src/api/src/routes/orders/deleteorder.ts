import { Request, Response, NextFunction } from 'express';
import { logger } from '../../utils/logger';
import OrderModel from '../../models/Order';
import { AppError } from '../../middleware/errorHandler';

export default async function createOrder(req: Request, res: Response, next: NextFunction) {
  try {
    logger.info('Deleting order');
    const { id } = req.params;
    
    const order = await OrderModel.findByPk(id);
    if (!order) {
      return next(new AppError('Order not found', 'not-found', 404, {
        id: id,
      }));
    }

    await order.destroy();

    res.status(200).json({
      success: true,
      data: {
        id: order.id,
        product: order.product,
        price: order.price,
        qty: order.qty,
      },
    });
  } catch(error: any) {
    logger.error(error);
    next(new AppError('Failed to delete order', 'internal-server-error', 500, {
      error: error,
    }));
  } 
}