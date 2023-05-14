import dotenv from 'dotenv';
dotenv.config();

const consts = {
  API_GATEWAY_URL: process.env.API_GATEWAY_URL || 'http://localhost:3003',
  GENERATION_URL: process.env.GENERATION_URL || '',
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || '',
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || '',
  AWS_REGION: process.env.AWS_REGION,
  AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME || '',
  SUPABASE_PROJECT_URL: process.env.SUPABASE_PROJECT_URL || '',
  SUPABASE_API_KEY: process.env.SUPABASE_API_KEY || '',

};

export { consts };