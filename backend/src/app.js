import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import pinoHttp from 'pino-http';

import env from './config/env.js';
import logger from './config/logger.js';

import errorMiddleware from './middlewares/error.middleware.js';
import notFoundMiddleware from './middlewares/notFound.middleware.js';

//importing routes
import healthRoutes from './routes/health.routes.js';
import authRoutes from './routes/auth.routes.js';
import profileRoutes from './routes/profile.routes.js';
import aiRoutes from './routes/ai.routes.js';
import postRoutes from './routes/post.routes.js';

const app = express();

app.disable('x-powered-by');

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  })
);

app.use(compression());

app.use(cookieParser());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(
  pinoHttp({
    logger,
  })
);

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/

app.use('/api/v1/health', healthRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/profile', profileRoutes);
app.use('/api/v1/ai', aiRoutes);
app.use(
  '/api/v1/posts',
  postRoutes
);

/*
|--------------------------------------------------------------------------
| 404
|--------------------------------------------------------------------------
*/

app.use(notFoundMiddleware);

/*
|--------------------------------------------------------------------------
| Error Handler
|--------------------------------------------------------------------------
*/

app.use(errorMiddleware);

export default app;