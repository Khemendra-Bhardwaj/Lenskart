const redis = require('redis');

// Create a Redis client
const redisClient = redis.createClient({
    url: `redis://redis:6379`
});

// Handle connection errors
redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});



const initRedis = async () =>{
    // Connect to Redis
    await redisClient.connect();
}

// Test the Redis connection
const testRedisConnection = async () => {
  try {
    await redisClient.ping();
    console.log('Redis connected successfully');
  } catch (err) {
    console.error('Failed to connect to Redis:', err);
    throw err;
  }
};

module.exports = { redisClient,  initRedis,  testRedisConnection };