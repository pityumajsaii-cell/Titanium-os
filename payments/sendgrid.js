const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(to, content) {
  await sgMail.send({
    to, from: "sales@yourdomain.com",
    subject: "Kövessük a beszélgetést",
    text: content
  });
  console.log("📩 EMAIL SENT TO:", to);
}
module.exports = { sendEmail };
