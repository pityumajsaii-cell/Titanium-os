require("dotenv").config();
const express = require("express");
const bus = require("./core/bus");
const app = express();
app.use(express.json());

app.post("/event", async (req, res) => {
  await bus.emit({ id: req.body.id || Date.now(), type: req.body.event, payload: req.body.payload });
  res.json({ ok: true });
});

app.listen(3000, () => console.log("🚀 API Running :3000"));
app.post("/score", async (req,res)=>{
  const { scoreLead, decide } = require("./ai/engine");
  const score = await scoreLead(req.body.payload);
  const decision = await decide(score);
  res.json({ score, decision });
});

app.post("/checkout", async (req,res)=>{
  const { createCheckout } = require("./payments/stripe");
  const url = await createCheckout(req.body.email, req.body.score);
  res.json({ url });
});
