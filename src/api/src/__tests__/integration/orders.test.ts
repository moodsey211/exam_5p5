import request from 'supertest';
import app from '../../index';
import { sequelize } from '../../utils/database';
import OrderModel from '../../models/Order';

describe('Testing the orders API', () => {
  const agent = request(app);
  const orderUrl = '/api/orders';

  beforeAll(async () => {
    // clear out the database
    await sequelize.sync({ force: true });
  });

  describe('POST /api/orders', () => {
    describe('Testing the validations', () => {
      it('fails without post body', async () => {
        await agent.post(orderUrl).expect(400);
      });

      it('fails without product', async () => {
        await agent.post(orderUrl).send({ price: 100, qty: 1 }).expect(400);
      });

      it('fails without price', async () => {
        await agent.post(orderUrl).send({ product: 'test', qty: 1 }).expect(400);
      });

      it('fails without qty', async () => {
        await agent.post(orderUrl).send({ product: 'test', price: 100 }).expect(400);
      });

      it('fails with invalid qty', async () => {
        await agent.post(orderUrl).send({ product: 'test', price: 100, qty: 'invalid' }).expect(400);
      });

      it('fails with invalid price', async () => {
        await agent.post(orderUrl).send({ product: 'test', price: 'invalid', qty: 1 }).expect(400);
      });
    });

    describe('Testing the create order', () => {
      it('creates an order', async () => {
        await agent.post(orderUrl).send({ product: 'test', price: 100, qty: 1 }).expect(200);

        const order = await OrderModel.findOne({ where: { product: 'test' } });
        expect(order).toBeDefined();
        expect(order?.product).toBe('test');
        expect(order?.price).toBe(100);
        expect(order?.qty).toBe(1);
      });
    });
  });

  describe('GET /api/orders', () => {
    describe('Testing the get orders', () => {
      beforeEach(async () => {
        // Clear orders before each test
        await OrderModel.destroy({ where: {} });
      });

      it('gets all orders when no orders exist', async () => {
        const response = await agent.get(orderUrl).expect(200);
        
        expect(response.body).toEqual({
          success: true,
          data: [],
          meta: {
            total: 0,
            limit: 10,
            offset: 0,
          },
        });
      });

      it('gets all orders when orders exist', async () => {
        // Create test orders
        await OrderModel.bulkCreate([
          { product: 'Laptop', price: 999.99, qty: 2 },
          { product: 'Mouse', price: 25.50, qty: 5 },
          { product: 'Keyboard', price: 75.00, qty: 3 },
        ]);

        const response = await agent.get(orderUrl).expect(200);
        
        expect(response.body.success).toBe(true);
        expect(response.body.data).toHaveLength(3);
        expect(response.body.meta).toEqual({
          total: 3,
          limit: 10,
          offset: 0,
        });

        // Check the structure of each order
        response.body.data.forEach((order: any) => {
          expect(order).toHaveProperty('id');
          expect(order).toHaveProperty('product');
          expect(order).toHaveProperty('price');
          expect(order).toHaveProperty('qty');
          expect(order).toHaveProperty('actions');
          expect(order.actions).toHaveProperty('remove');
          expect(order.actions.remove).toHaveProperty('method', 'DELETE');
          expect(order.actions.remove).toHaveProperty('url');
        });

        // Check specific order data
        const laptopOrder = response.body.data.find((order: any) => order.product === 'Laptop');
        expect(laptopOrder).toBeDefined();
        expect(laptopOrder.price).toBe(999.99);
        expect(laptopOrder.qty).toBe(2);
      });

      it('filters orders by product name', async () => {
        // Create test orders
        await OrderModel.bulkCreate([
          { product: 'Laptop', price: 999.99, qty: 2 },
          { product: 'Gaming Laptop', price: 1499.99, qty: 1 },
          { product: 'Mouse', price: 25.50, qty: 5 },
        ]);

        const response = await agent.get(`${orderUrl}?product=Laptop`).expect(200);
        
        expect(response.body.success).toBe(true);
        expect(response.body.data).toHaveLength(2);
        expect(response.body.meta.total).toBe(2);
        
        // Should return both "Laptop" and "Gaming Laptop"
        const products = response.body.data.map((order: any) => order.product);
        expect(products).toContain('Laptop');
        expect(products).toContain('Gaming Laptop');
      });

      it('handles pagination with limit and offset', async () => {
        // Create test orders
        await OrderModel.bulkCreate([
          { product: 'Product 1', price: 10, qty: 1 },
          { product: 'Product 2', price: 20, qty: 2 },
          { product: 'Product 3', price: 30, qty: 3 },
          { product: 'Product 4', price: 40, qty: 4 },
          { product: 'Product 5', price: 50, qty: 5 },
        ]);

        // Test with limit 2 and offset 1
        const response = await agent.get(`${orderUrl}?limit=2&offset=1`).expect(200);
        
        expect(response.body.success).toBe(true);
        expect(response.body.data).toHaveLength(2);
        expect(response.body.meta).toEqual({
          total: 5,
          limit: 2,
          offset: 1,
        });

        // Should return Product 2 and Product 3 (offset 1, limit 2)
        const products = response.body.data.map((order: any) => order.product);
        expect(products).toContain('Product 2');
        expect(products).toContain('Product 3');
      });

      it('handles invalid limit parameter', async () => {
        await agent.get(`${orderUrl}?limit=invalid`).expect(400);
      });

      it('handles invalid offset parameter', async () => {
        await agent.get(`${orderUrl}?offset=invalid`).expect(400);
      });
    });
  });

  describe('DELETE /api/orders/:id', () => {
    it('deletes an order', async () => {
      // Create an order
      const order = await OrderModel.create({
        product: 'Product 1',
        price: 10,
        qty: 1,
      });

      // Test with limit 2 and offset 1
      const response = await agent.delete(`${orderUrl}/${order.id}`).expect(200);

      expect(response.body.success).toBe(true);

      const checkOrder = await OrderModel.findOne({ where: { id: order.id } });
      expect(checkOrder).toBeNull();
    });
  });

  afterAll(async () => {
    await new Promise(resolve => setTimeout(resolve, 100));
  });
});