import { type Order } from '../../types/orders';

// Enhanced product catalog with categories and realistic pricing
const PRODUCT_CATALOG = {
  electronics: [
    { name: 'Laptop Pro', minPrice: 800, maxPrice: 3000 },
    { name: '4K Monitor', minPrice: 300, maxPrice: 1200 },
    { name: 'Wireless Mouse', minPrice: 20, maxPrice: 150 },
    { name: 'Mechanical Keyboard', minPrice: 80, maxPrice: 300 },
    { name: 'Bluetooth Headphones', minPrice: 50, maxPrice: 400 },
    { name: 'Gaming Mouse', minPrice: 30, maxPrice: 200 },
    { name: 'Webcam HD', minPrice: 40, maxPrice: 200 },
    { name: 'External SSD', minPrice: 60, maxPrice: 500 },
    { name: 'Wireless Charger', minPrice: 15, maxPrice: 100 },
    { name: 'Smart Watch', minPrice: 100, maxPrice: 800 }
  ],
  accessories: [
    { name: 'USB-C Cable', minPrice: 5, maxPrice: 30 },
    { name: 'Cable Organizer', minPrice: 3, maxPrice: 20 },
    { name: 'Tablet Stand', minPrice: 10, maxPrice: 80 },
    { name: 'Desk Lamp', minPrice: 20, maxPrice: 150 },
    { name: 'Ergonomic Chair', minPrice: 200, maxPrice: 2000 },
    { name: 'Monitor Stand', minPrice: 30, maxPrice: 200 },
    { name: 'Laptop Sleeve', minPrice: 15, maxPrice: 80 },
    { name: 'Wireless Earbuds', minPrice: 25, maxPrice: 300 }
  ]
};

// Simple random utilities
function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function randomElement<T>(array: T[]): T {
  return array[randomInt(0, array.length - 1)]!;
}

/**
 * Generate a realistic fake order with proper pricing and quantities
 */
export function generateRealisticOrder(id?: number): Order {
  const allProducts = [...PRODUCT_CATALOG.electronics, ...PRODUCT_CATALOG.accessories];
  const product = randomElement(allProducts);
  
  // Generate realistic quantity based on product type
  const isElectronics = PRODUCT_CATALOG.electronics.some(p => p.name === product.name);
  const maxQty = isElectronics ? 3 : 10; // Electronics typically have lower quantities
  const qty = randomInt(1, maxQty);
  
  // Generate realistic price within the product's range
  const price = Math.round(randomFloat(product.minPrice, product.maxPrice));
  
  return {
    id: id ?? randomInt(1, 100000),
    product: product.name,
    qty,
    price
  };
}

/**
 * Generate multiple realistic orders
 */
export function generateRealisticOrders(count: number, startId: number = 1): Order[] {
  const orders: Order[] = [];
  for (let i = 0; i < count; i++) {
    orders.push(generateRealisticOrder(startId + i));
  }
  return orders;
}

/**
 * Generate orders with specific patterns for testing
 */
export function generatePatternOrders(): {
  bulkPurchase: Order[];
  highValue: Order[];
  mixedCategories: Order[];
  seasonal: Order[];
  clearance: Order[];
} {
  return {
    // Bulk purchase scenario - many low-cost items
    bulkPurchase: [
      { id: 1, product: 'USB-C Cable', qty: 100, price: 8 },
      { id: 2, product: 'Cable Organizer', qty: 50, price: 5 },
      { id: 3, product: 'Laptop Sleeve', qty: 25, price: 20 },
      { id: 4, product: 'Wireless Charger', qty: 30, price: 25 }
    ],
    
    // High value scenario - expensive electronics
    highValue: [
      { id: 1, product: 'Laptop Pro', qty: 1, price: 2500 },
      { id: 2, product: '4K Monitor', qty: 2, price: 800 },
      { id: 3, product: 'Ergonomic Chair', qty: 1, price: 1500 },
      { id: 4, product: 'Smart Watch', qty: 1, price: 600 }
    ],
    
    // Mixed categories with realistic distribution
    mixedCategories: [
      { id: 1, product: 'Laptop Pro', qty: 1, price: 1800 },
      { id: 2, product: 'Wireless Mouse', qty: 3, price: 45 },
      { id: 3, product: 'USB-C Cable', qty: 10, price: 12 },
      { id: 4, product: 'Bluetooth Headphones', qty: 2, price: 120 },
      { id: 5, product: 'Desk Lamp', qty: 1, price: 80 },
      { id: 6, product: 'External SSD', qty: 1, price: 200 }
    ],
    
    // Seasonal scenario - holiday shopping
    seasonal: [
      { id: 1, product: 'Smart Watch', qty: 5, price: 300 },
      { id: 2, product: 'Wireless Earbuds', qty: 8, price: 80 },
      { id: 3, product: 'Tablet Stand', qty: 12, price: 25 },
      { id: 4, product: 'Laptop Sleeve', qty: 15, price: 30 }
    ],
    
    // Clearance scenario - discounted items
    clearance: [
      { id: 1, product: 'Gaming Mouse', qty: 20, price: 15 },
      { id: 2, product: 'Webcam HD', qty: 15, price: 25 },
      { id: 3, product: 'Monitor Stand', qty: 10, price: 20 },
      { id: 4, product: 'Wireless Charger', qty: 25, price: 8 }
    ]
  };
}

/**
 * Generate stress test data with large datasets
 */
export function generateStressTestData(): {
  small: Order[];
  medium: Order[];
  large: Order[];
  huge: Order[];
} {
  return {
    small: generateRealisticOrders(10),
    medium: generateRealisticOrders(100),
    large: generateRealisticOrders(1000),
    huge: generateRealisticOrders(10000)
  };
}

/**
 * Generate edge case orders for comprehensive testing
 */
export function generateEdgeCaseOrders(): {
  singleItem: Order[];
  maxQuantity: Order[];
  minPrice: Order[];
  maxPrice: Order[];
  duplicateIds: Order[];
} {
  return {
    singleItem: [{ id: 1, product: 'USB-C Cable', qty: 1, price: 5 }],
    maxQuantity: [{ id: 1, product: 'Cable Organizer', qty: 999999, price: 1 }],
    minPrice: [{ id: 1, product: 'USB-C Cable', qty: 1, price: 1 }],
    maxPrice: [{ id: 1, product: 'Laptop Pro', qty: 1, price: 999999 }],
    duplicateIds: [
      { id: 1, product: 'Product A', qty: 1, price: 100 },
      { id: 1, product: 'Product B', qty: 2, price: 200 }
    ]
  };
} 