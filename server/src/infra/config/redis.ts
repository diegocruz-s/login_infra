console.log('process.env.REDIS_PASSWORD:', process.env.REDIS_PASSWORD);
import 'dotenv/config'
export const ConfigRedis = {
  host: 'redis_container',
  port: 6379,
  password: process.env.REDIS_PASSWORD,
};