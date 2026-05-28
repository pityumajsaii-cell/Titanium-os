const OpenAI = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function scoreLead(p) {
  let s = 10;
  if (p.intent === "buy") s += 45;
  if (p.behavior === "high_click") s += 25;
  if (p.source === "lovable") s += 15;
  return s;
}

async function decide(s) {
  if (s >= 80) return "CLOSE_NOW";
  if (s >= 50) return "FOLLOW_UP";
  return "IGNORE";
}

async function generateEmail(email, score, payload) {
  const res = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: `Írj rövid, magyar sales emailt. Lead: ${email}, score: ${score}, intent: ${payload.intent}. Cél: Stripe fizetési linkre terelni.` }]
  });
  return res.choices[0].message.content;
}

module.exports = { scoreLead, decide, generateEmail };
