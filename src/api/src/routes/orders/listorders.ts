import { Request, Response, NextFunction } from 'express';
import { Op } from 'sequelize';
import { logger } from '../../utils/logger';
import OrderModel from '../../models/Order';
import { AppError } from '../../middleware/errorHandler';

export default async function listOrders(req: Request, res: Response, next: NextFunction) {
  try {
    logger.info('Listing orders');
    const product = req.query['product'] as string || '';
    const limit = req.query['limit'] ? parseInt(req.query['limit'] as string) : 10;
    const offset = req.query['offset'] ? parseInt(req.query['offset'] as string) : 0;
    
    const { count, rows: orders } = await OrderModel.findAndCountAll({
      where: {
        product: {
          [Op.like]: `%${product}%`,
        },
      },
      limit,
      offset,
    });

    res.status(200).json({
      success: true,
      data: orders.map((order: any) => ({
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
      })),
      meta: {
        total: count,
        limit,
        offset,
      },
    });
  } catch(error: any) {
    logger.error(error);
    next(new AppError('Failed to list orders', 'internal-server-error', 500, {
      error: error,
    }));
  } 
}