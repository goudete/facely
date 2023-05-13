import dotenv from 'dotenv';
dotenv.config();

const consts = {
  API_GATEWAY_URL: process.env.API_GATEWAY_URL || 'http://localhost:3003',
};

export { consts };