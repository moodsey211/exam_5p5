import { Request, Response, NextFunction } from 'express';
import { Order } from '../../types/orders';
import summarizeOrders from '../../logic/summarize';
import { logger } from '../../utils/logger';
import OrderModel from '../../models/Order';
import { AppError } from '../../middleware/errorHandler';

export default async function getSummary(_req: Request, res: Response, next: NextFunction) {
  try {
    logger.info('Getting summary of orders');
    
    const orders: Order[] = (await OrderModel.findAll()).map((order: any) => ({
      id: order.id,
      product: order.product,
      price: order.price,
      qty: order.qty,
    }) as Order);

    const summary = summarizeOrders(orders);
    res.status(200).json({
      success: true,
      data: summary,
    });
  } catch(error: any) {
    logger.error(error);
    next(new AppError('Failed to get summary of orders', 'internal-server-error', 500, {
      error: error,
    }));
  } 
}