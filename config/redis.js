const { createClient } = require("redis");

const client = createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});

client.on("connect", () => {
  console.log("Connected to Redis");
});

module.exports = client;
