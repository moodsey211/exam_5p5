import { type Order, type Summary } from '../../types/orders';
import summarizeOrders from '../../logic/summarize';
import { generateFakeOrders, generateTestOrders } from '../helpers/fakeOrders';
import { 
  generateRealisticOrders, 
  generatePatternOrders, 
  generateStressTestData,
  generateEdgeCaseOrders 
} from '../helpers/advancedFakeOrders';

describe('Testing the sumarize function', () => {
  it('should handle empty orders', () => {
    const orders: Order[] = [];
    const summary: Summary = summarizeOrders(orders);

    expect(summary).toEqual({
      totalRevenue: 0,
      medianOrderPrice: 0,
      topProductByQty: '',
      uniqueProductCount: 0,
    });
  });

  it('should handle a single order', () => {
    const orders: Order[] = [{
      id: 1,
      product: 'Product 1',
      qty: 1,
      price: 100,
    }];
    const summary: Summary = summarizeOrders(orders);

    expect(summary).toEqual({
      totalRevenue: 100,
      medianOrderPrice: 100,
      topProductByQty: 'Product 1',
      uniqueProductCount: 1,
    });
  });

  it('should handle multiple orders', () => {
    const orders = generateFakeOrders(5);
    const summary: Summary = summarizeOrders(orders);

    expect(summary.totalRevenue).toBeGreaterThan(0);
    expect(summary.medianOrderPrice).toBeGreaterThan(0);
    expect(summary.uniqueProductCount).toBeGreaterThan(0);
    expect(summary.topProductByQty).toBeTruthy();
  });

  it('should handle orders with duplicate products', () => {
    const testOrders = generateTestOrders();
    const summary: Summary = summarizeOrders(testOrders.duplicateProducts);

    // Laptop Pro has total qty of 3 (2+1), Wireless Mouse has total qty of 5 (3+2)
    expect(summary.topProductByQty).toBe('Wireless Mouse');
    expect(summary.uniqueProductCount).toBe(3);
    expect(summary.totalRevenue).toBe(4000);
    expect(summary.medianOrderPrice).toBe(150);
  });

  it('should handle orders with high quantities', () => {
    const testOrders = generateTestOrders();
    const summary: Summary = summarizeOrders(testOrders.highQuantity);

    expect(summary.topProductByQty).toBe('USB-C Cable');
    expect(summary.uniqueProductCount).toBe(3);
    expect(summary.totalRevenue).toBe(1400);
    expect(summary.medianOrderPrice).toBe(450);
  });

  it('should handle expensive orders', () => {
    const testOrders = generateTestOrders();
    const summary: Summary = summarizeOrders(testOrders.expensive);

    expect(summary.topProductByQty).toBe('Laptop Pro');
    expect(summary.uniqueProductCount).toBe(3);
    expect(summary.totalRevenue).toBe(4500);
    expect(summary.medianOrderPrice).toBe(1200);
  });

  it('should generate random orders for stress testing', () => {
    const randomOrders = generateFakeOrders(100);
    const summary: Summary = summarizeOrders(randomOrders);

    expect(summary.totalRevenue).toBeGreaterThan(0);
    expect(summary.medianOrderPrice).toBeGreaterThan(0);
    expect(summary.uniqueProductCount).toBeGreaterThan(0);
    expect(summary.uniqueProductCount).toBeLessThanOrEqual(100);
  });

  describe('Advanced fake order tests', () => {
    it('should handle realistic orders', () => {
      const orders = generateRealisticOrders(10);
      const summary: Summary = summarizeOrders(orders);

      expect(summary.totalRevenue).toBeGreaterThan(0);
      expect(summary.medianOrderPrice).toBeGreaterThan(0);
      expect(summary.uniqueProductCount).toBeGreaterThan(0);
    });

    it('should handle bulk purchase patterns', () => {
      const patternOrders = generatePatternOrders();
      const summary: Summary = summarizeOrders(patternOrders.bulkPurchase);

      // Bulk purchase should have high total revenue due to quantities
      expect(summary.totalRevenue).toBeGreaterThan(1000);
      expect(summary.topProductByQty).toBe('USB-C Cable');
    });

    it('should handle high value patterns', () => {
      const patternOrders = generatePatternOrders();
      const summary: Summary = summarizeOrders(patternOrders.highValue);

      // High value orders should have high median price
      expect(summary.medianOrderPrice).toBeGreaterThan(500);
      expect(summary.totalRevenue).toBeGreaterThan(4000);
    });

    it('should handle mixed category patterns', () => {
      const patternOrders = generatePatternOrders();
      const summary: Summary = summarizeOrders(patternOrders.mixedCategories);

      expect(summary.uniqueProductCount).toBe(6);
      expect(summary.totalRevenue).toBe(1800 + 3*45 + 10*12 + 2*120 + 80 + 200);
    });

    it('should handle seasonal patterns', () => {
      const patternOrders = generatePatternOrders();
      const summary: Summary = summarizeOrders(patternOrders.seasonal);

      // Seasonal should have moderate quantities across products
      expect(summary.uniqueProductCount).toBe(4);
      expect(summary.topProductByQty).toBe('Laptop Sleeve'); // qty 15
    });

    it('should handle clearance patterns', () => {
      const patternOrders = generatePatternOrders();
      const summary: Summary = summarizeOrders(patternOrders.clearance);

      expect(summary.topProductByQty).toBe('Wireless Charger');
      expect(summary.medianOrderPrice).toBeLessThan(1075);
    });
  });

  describe('Stress testing with large datasets', () => {
    it('should handle small datasets efficiently', () => {
      const stressData = generateStressTestData();
      const summary: Summary = summarizeOrders(stressData.small);

      expect(summary.uniqueProductCount).toBeLessThanOrEqual(10);
    });

    it('should handle medium datasets', () => {
      const stressData = generateStressTestData();
      const summary: Summary = summarizeOrders(stressData.medium);

      expect(summary.uniqueProductCount).toBeLessThanOrEqual(100);
      expect(summary.totalRevenue).toBeGreaterThan(0);
    });

    it('should handle large datasets', () => {
      const stressData = generateStressTestData();
      const summary: Summary = summarizeOrders(stressData.large);

      expect(summary.uniqueProductCount).toBeLessThanOrEqual(1000);
      expect(summary.totalRevenue).toBeGreaterThan(0);
    });

    it('should handle huge datasets', () => {
      const stressData = generateStressTestData();
      const summary: Summary = summarizeOrders(stressData.huge);

      expect(summary.uniqueProductCount).toBeLessThanOrEqual(10000);
      expect(summary.totalRevenue).toBeGreaterThan(0);
    });
  });

  describe('Edge case testing', () => {
    it('should handle single item orders', () => {
      const edgeCases = generateEdgeCaseOrders();
      const summary: Summary = summarizeOrders(edgeCases.singleItem);

      expect(summary.totalRevenue).toBe(5);
      expect(summary.medianOrderPrice).toBe(5);
      expect(summary.uniqueProductCount).toBe(1);
      expect(summary.topProductByQty).toBe('USB-C Cable');
    });

    it('should handle maximum quantity orders', () => {
      const edgeCases = generateEdgeCaseOrders();
      const summary: Summary = summarizeOrders(edgeCases.maxQuantity);

      expect(summary.totalRevenue).toBe(999999);
      expect(summary.topProductByQty).toBe('Cable Organizer');
    });

    it('should handle minimum price orders', () => {
      const edgeCases = generateEdgeCaseOrders();
      const summary: Summary = summarizeOrders(edgeCases.minPrice);

      expect(summary.totalRevenue).toBe(1);
      expect(summary.medianOrderPrice).toBe(1);
    });

    it('should handle maximum price orders', () => {
      const edgeCases = generateEdgeCaseOrders();
      const summary: Summary = summarizeOrders(edgeCases.maxPrice);

      expect(summary.totalRevenue).toBe(999999);
      expect(summary.medianOrderPrice).toBe(999999);
    });

    it('should handle duplicate IDs gracefully', () => {
      const edgeCases = generateEdgeCaseOrders();
      const summary: Summary = summarizeOrders(edgeCases.duplicateIds);

      expect(summary.uniqueProductCount).toBe(2);
      expect(summary.topProductByQty).toBe('Product B'); // qty 2 vs qty 1
    });
  });
});