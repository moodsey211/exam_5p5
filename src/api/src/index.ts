import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { errorHandler } from './middleware/errorHandler';
import { connectToDatabase } from './utils/database';
import commonRoutes from './routes/common/routes';
import ordersRoutes from './routes/orders/routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', ordersRoutes);
app.use('/api', commonRoutes);

app.use(errorHandler);

async function startServer() {
    try {
      await connectToDatabase();
      
      await app.listen(PORT, () => {
        console.log(`🚀 Server is running on port ${PORT}`);
        console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
      });
    } catch (error) {
      logger.error('Failed to start server:', error);
      process.exit(1);
    }
}

startServer();

export default app;