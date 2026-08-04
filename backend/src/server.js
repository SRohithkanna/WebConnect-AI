import app from './app.js';
import env from './config/env.js';
import { disconnectDatabase } from './config/db.js';
import connectDatabase from './config/db.js';
import logger from './config/logger.js';

let server;

const startServer = async () => {
  try {
    await connectDatabase();

    server = app.listen(env.PORT, () => {
      logger.info(
        `🚀 Server running on http://localhost:${env.PORT}`
      );
    });
  } catch (error) {
    logger.fatal({ err: error }, 'Failed to start server.');
    process.exit(1);
  }
};

await startServer();

const gracefulShutdown = async (signal) => {
  logger.warn(`${signal} received. Shutting down...`);

  if (server) {
    server.close(async () => {
      await disconnectDatabase();

      logger.info('HTTP server closed.');

      process.exit(0);
    });
  }
};

process.on('SIGINT', () => gracefulShutdown('SIGINT'));

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

process.on('uncaughtException', (error) => {
  logger.fatal({ err: error }, 'Uncaught Exception');
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  logger.fatal({ err: reason }, 'Unhandled Promise Rejection');
  process.exit(1);
});