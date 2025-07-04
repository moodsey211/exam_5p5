import { Sequelize } from 'sequelize';
import winston from 'winston';

export const sequelize = new Sequelize({
  dialect: (process.env['DATABASE_DIALECT'] as any) || 'sqlite',
  storage: process.env['DATABASE_STORAGE'] || ':memory:',
  logging: (msg) => winston.debug(msg),
});

export async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    winston.info('Connection has been established successfully.');
  } catch (error) {
    winston.error('Unable to connect to the database:', error);
  }
}

export async function initDatabase() {
  try {
    await sequelize.sync({ force: true });
    winston.info('Database synchronized successfully');
  } catch (error) {
    winston.error('Error synchronizing database:', error);
    throw error;
  }
}