require("dotenv").config();
const bus = require("./core/bus");
const { scoreLead, decide, generateEmail } = require("./ai/engine");
const { createCheckout } = require("./payments/stripe");
const { sendEmail } = require("./payments/sendgrid");

console.log("⚙️ TITANIUM ENGINE ONLINE");
setInterval(async () => {
  const event = await bus.consume();
  if (!event) return;
  if (await bus.isProcessed(event.id)) return;

  console.log("🔥 EVENT:", event.type);
  const score = await scoreLead(event.payload);
  const decision = await decide(score);
  console.log("📊 SCORE:", score, "🎯 DECISION:", decision);

  await bus.markProcessed(event.id);

  if (decision === "CLOSE_NOW") {
    const email = await generateEmail(event.payload.email, score, event.payload);
    const link = await createCheckout(event.payload.email, score);
    await sendEmail(event.payload.email, `${email}\n\nFizetés itt: ${link}`);
  }
}, 1000);
