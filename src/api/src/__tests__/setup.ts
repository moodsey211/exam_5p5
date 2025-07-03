// Test setup file
import dotenv from 'dotenv';

// Load environment variables for testing
dotenv.config({ path: '.env.test' });

// Set test environment
process.env['NODE_ENV'] = 'test'; 

global.console = {
  ...console,
  log: () => '',
  debug: () => '',
  info: () => '',
  warn: () => '',
  error: () => '',
}; 