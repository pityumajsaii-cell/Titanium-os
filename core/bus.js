const { createClient } = require("redis");
const client = createClient({ url: process.env.REDIS_URL || "redis://127.0.0.1:6379" });
client.connect();
const Q = "events", PROC = "processed";
module.exports = {
  emit: async (e) => { await client.lPush(Q, JSON.stringify(e)); },
  consume: async () => { const d = await client.rPop(Q); return d ? JSON.parse(d) : null; },
  isProcessed: async (id) => await client.sIsMember(PROC, id),
  markProcessed: async (id) => await client.sAdd(PROC, id)
};
