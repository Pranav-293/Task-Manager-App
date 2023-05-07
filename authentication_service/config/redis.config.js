const RedisStore = require("connect-redis").default;
const redis = require("redis");
const createClient = redis.createClient;

// Initialize Client
let redisClient = createClient();
redisClient.connect().catch(console.error).then(console.log("Redis server connected"));

//Initialize Store
let redisStore = new RedisStore({
    client: redisClient
  });

  module.exports = redisStore;