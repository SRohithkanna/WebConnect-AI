import mongoose from 'mongoose';

import env from './env.js';
import logger from './logger.js';

mongoose.connection.on('connected', () => {
  logger.info('MongoDB connection established.');
});

mongoose.connection.on('error', (error) => {
  logger.error({ err: error }, 'MongoDB connection error.');
});

mongoose.connection.on('disconnected', () => {
  logger.warn('MongoDB connection lost.');
});

const connectDatabase = async () => {
  try {
    await mongoose.connect(env.MONGODB_URI);

    logger.info('Database connection initialized successfully.');
  } catch (error) {
    logger.fatal({ err: error }, 'Failed to connect to MongoDB.');
    process.exit(1);
  }
};

export const disconnectDatabase = async () => {
  try {
    await mongoose.connection.close();

    logger.info('MongoDB connection closed.');
  } catch (error) {
    logger.error({ err: error }, 'Error while closing MongoDB connection.');
  }
};

export default connectDatabase;