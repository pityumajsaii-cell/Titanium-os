const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function createCheckout(email, score) {
  const price = score >= 90 ? 19900 : score >= 80 ? 9900 : 4900;
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: email,
    line_items: [{ price_data: { currency: "eur", product_data: { name: "Titanium AI Automation" }, unit_amount: price }, quantity: 1 }],
    success_url: "https://yourdomain.com/success",
    cancel_url: "https://yourdomain.com/cancel"
  });
  console.log("💳 CHECKOUT LINK:", session.url);
  return session.url;
}
module.exports = { createCheckout };
