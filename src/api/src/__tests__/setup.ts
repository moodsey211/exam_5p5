// Test setup file
import dotenv from 'dotenv';
import { sequelize } from '../utils/database';

// Load environment variables for testing
dotenv.config({ path: '.env.test' });

// Set test environment
process.env['NODE_ENV'] = 'test'; 

global.console = {
  ...console,
//  log: () => '',
  debug: () => '',
  info: () => '',
  warn: () => '',
  error: () => '',
};

// Cleanup after all tests
afterAll(async () => {
  // Close database connection if it exists
  if (sequelize) {
    await sequelize.close();
  }
  
  // Add a small delay to ensure all operations complete
  await new Promise(resolve => setTimeout(resolve, 500));
}); 