const NodeCache = require('node-cache');
const redis = require('redis');

// Local cache (L1)
const localCache = new NodeCache({ stdTTL: 60, checkperiod: 120 }); // TTL: 60 seconds

// Redis client (L2)
const redisClient = redis.createClient({
    url: `redis://redis:6379`  
});

// Handle Redis connection errors
redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

// Connect to Redis
redisClient.connect();

// Multi-level cache class
class MultiCache {
  // Get data from cache
  static async get(key) {
    // Check L1 cache
    const l1Data = localCache.get(key);
    if (l1Data) {
      console.log('Cache hit: Returning data from L1 cache');
      return l1Data;
    }

    // Check L2 cache
    const l2Data = await redisClient.get(key);
    if (l2Data) {
      console.log('Cache hit: Returning data from L2 cache');
      localCache.set(key, JSON.parse(l2Data)); // Store in L1 cache
      return JSON.parse(l2Data);
    }

    // Cache miss
    console.log('Cache miss: Data not found in L1 or L2 cache');
    return null;
  }

  // Set data in cache
  static async set(key, value, ttl = 3600) {
    // Store in L1 cache
    localCache.set(key, value);

    // Store in L2 cache
    await redisClient.set(key, JSON.stringify(value), {
      EX: ttl, // Set expiration time in seconds
    });
  }

  // Delete data from cache
  static async del(key) {
    // Delete from L1 cache
    localCache.del(key);

    // Delete from L2 cache
    await redisClient.del(key);
  }
}

module.exports = MultiCache;