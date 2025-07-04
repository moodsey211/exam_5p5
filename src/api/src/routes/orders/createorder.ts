import { Request, Response, NextFunction } from 'express';
import { logger } from '../../utils/logger';
import OrderModel from '../../models/Order';
import { AppError } from '../../middleware/errorHandler';

export default async function createOrder(req: Request, res: Response, next: NextFunction) {
  try {
    logger.info('Creating order');
    const { product, price, qty } = req.body;
    
    const order = await OrderModel.create({
      product,
      price,
      qty,
    });

    res.status(200).json({
      success: true,
      data: {
        id: order.id,
        product: order.product,
        price: order.price,
        qty: order.qty,
        actions: {
          remove: {
            method: 'DELETE',
            url: `/api/orders/${order.id}`,
          }
        },
      },
    });
  } catch(error: any) {
    logger.error(error);
    next(new AppError('Failed to create order', 'internal-server-error', 500, {
      error: error,
    }));
  } 
}