const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(to, content) {

  await sgMail.send({

    to,

    from: process.env.FROM_EMAIL,

    subject: "Titanium AI Automation",

    text: content

  });

  console.log("📩 EMAIL SENT:", to);
}

module.exports = {
  sendEmail
};
