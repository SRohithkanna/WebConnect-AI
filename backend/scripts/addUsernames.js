import mongoose from 'mongoose';
import dotenv from 'dotenv';

import User from '../src/models/User.js';

dotenv.config();

const addUsernames = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
      throw new Error(
        'MONGODB_URI is not defined in your .env file.'
      );
    }

    await mongoose.connect(mongoUri);

    console.log('MongoDB connected.');

    const users = await User.find({});

    console.log(`Found ${users.length} users.`);

    for (const user of users) {
      // Skip users who already have a username
      if (user.username) {
        console.log(
          `Skipping ${user.name} - username already exists: ${user.username}`
        );
        continue;
      }

      // Create base username from name
      let baseUsername = user.name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '')
        .slice(0, 25);

      // Fallback if name doesn't produce a username
      if (!baseUsername) {
        baseUsername = 'user';
      }

      let username = baseUsername;
      let counter = 1;

      // Make username unique
      while (await User.exists({ username })) {
        username = `${baseUsername}${counter}`;
        counter++;
      }

      user.username = username;

      await user.save();

      console.log(
        `Updated ${user.name} -> @${username}`
      );
    }

    console.log('Username migration completed successfully.');

    await mongoose.disconnect();
  } catch (error) {
    console.error(
      'Username migration failed:',
      error
    );

    await mongoose.disconnect();

    process.exit(1);
  }
};

addUsernames();