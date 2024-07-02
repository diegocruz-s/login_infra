import 'dotenv/config'
console.log('process.env.REDIS_PASSWORD:', process.env.REDIS_PASSWORD);
export const ConfigRedis = {
  host: 'redis_container',
  port: 6379,
  password: process.env.REDIS_PASSWORD,
};