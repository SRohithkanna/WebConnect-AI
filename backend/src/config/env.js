import dotenv from 'dotenv';

dotenv.config();

const requiredEnvVariables = [
  'NODE_ENV',
  'PORT',
  'CLIENT_URL',
  'MONGODB_URI',
  'JWT_ACCESS_SECRET',
  'JWT_REFRESH_SECRET',
  'ACCESS_TOKEN_EXPIRES_IN',
  'REFRESH_TOKEN_EXPIRES_IN',
  'GEMINI_API_KEY',
];

const missingVariables = requiredEnvVariables.filter(
  (variable) => !process.env[variable]
);

if (missingVariables.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missingVariables.join(', ')}`
  );
}

const env = Object.freeze({
  NODE_ENV: process.env.NODE_ENV,

  PORT: Number(process.env.PORT),

  CLIENT_URL: process.env.CLIENT_URL,

  MONGODB_URI: process.env.MONGODB_URI,

  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,

  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,

  ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN,

  REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN,

  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
});

export default env;