import mongoose from 'mongoose';

import env from './env.js';
import logger from './logger.js';

const connectDatabase = async () => {
  try {
    const connection = await mongoose.connect(env.MONGODB_URI);

    logger.info(
      `MongoDB Connected: ${connection.connection.host}`
    );
  } catch (error) {
    logger.fatal(error, 'Failed to connect to MongoDB');
    process.exit(1);
  }
};

export default connectDatabase;