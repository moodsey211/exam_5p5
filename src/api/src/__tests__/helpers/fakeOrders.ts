import { type Order } from '../../types/orders';

// Sample product names for generating realistic test data
const PRODUCTS = [
  'Laptop Pro',
  'Wireless Mouse',
  'Mechanical Keyboard',
  '4K Monitor',
  'USB-C Cable',
  'Bluetooth Headphones',
  'Gaming Mouse',
  'Ergonomic Chair',
  'Desk Lamp',
  'Webcam HD',
  'External SSD',
  'Wireless Charger',
  'Smart Watch',
  'Tablet Stand',
  'Cable Organizer'
];

// Simple random number generator for testing
function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomElement<T>(array: T[]): T {
  return array[randomInt(0, array.length - 1)]!;
}

/**
 * Generate a single fake order
 */
export function generateFakeOrder(id?: number): Order {
  return {
    id: id ?? randomInt(1, 10000),
    product: randomElement(PRODUCTS),
    qty: randomInt(1, 10),
    price: randomInt(10, 2000)
  };
}

/**
 * Generate multiple fake orders
 */
export function generateFakeOrders(count: number, startId: number = 1): Order[] {
  const orders: Order[] = [];
  for (let i = 0; i < count; i++) {
    orders.push(generateFakeOrder(startId + i));
  }
  return orders;
}

/**
 * Generate orders with specific characteristics for testing edge cases
 */
export function generateTestOrders(): {
  empty: Order[];
  single: Order[];
  multiple: Order[];
  duplicateProducts: Order[];
  highQuantity: Order[];
  expensive: Order[];
} {
  return {
    empty: [],
    single: [generateFakeOrder(1)],
    multiple: generateFakeOrders(5),
    duplicateProducts: [
      { id: 1, product: 'Laptop Pro', qty: 2, price: 1200 },
      { id: 2, product: 'Laptop Pro', qty: 1, price: 1200 },
      { id: 3, product: 'Wireless Mouse', qty: 3, price: 50 },
      { id: 4, product: 'Wireless Mouse', qty: 2, price: 50 },
      { id: 5, product: 'Mechanical Keyboard', qty: 1, price: 150 }
    ],
    highQuantity: [
      { id: 1, product: 'USB-C Cable', qty: 50, price: 15 },
      { id: 2, product: 'Cable Organizer', qty: 25, price: 8 },
      { id: 3, product: 'Desk Lamp', qty: 10, price: 45 }
    ],
    expensive: [
      { id: 1, product: 'Laptop Pro', qty: 1, price: 2500 },
      { id: 2, product: '4K Monitor', qty: 1, price: 800 },
      { id: 3, product: 'Ergonomic Chair', qty: 1, price: 1200 }
    ]
  };
} 