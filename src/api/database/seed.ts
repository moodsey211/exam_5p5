import { connectToDatabase, initDatabase } from '../src/utils/database';
import Order from '../src/models/Order';
import { generateRealisticOrders } from '../src/__tests__/helpers/advancedFakeOrders';

async function seedDatabase() {
  const orders = generateRealisticOrders(100);

  await connectToDatabase();
  await initDatabase();
  
  const records = await Order.bulkCreate(orders.map(order => ({
    product: order.product,
    price: order.price,
    qty: order.qty,
  })));
}

seedDatabase();