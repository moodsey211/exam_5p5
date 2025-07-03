import { Order, Summary } from '../types/orders';
import median from './median';

export default function (orders: Order[]): Summary {
  const summary: Summary = {
    totalRevenue: 0,
    medianOrderPrice: 0,
    topProductByQty: '',
    uniqueProductCount: 0,
  };

  if (orders.length === 0) {
    return summary;
  }

  summary.totalRevenue = orders.reduce((acc: number, order: Order) => acc + (order.price * order.qty), 0);
  summary.uniqueProductCount = new Set(orders.map(order => order.product)).size;
  summary.medianOrderPrice = median(orders.map(order => order.price * order.qty));
  summary.topProductByQty = orders.sort((a, b) => b.qty - a.qty)[0]?.product || '';

  return summary;
};