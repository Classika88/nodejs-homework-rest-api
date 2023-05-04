const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

sgMail.sendEmail = async (data) => {
  const email = { ...data, from: "waterholein@gmail.com" };
  await sgMail.send(email);
  return true;
};

// const email = {
//   to: "yedeti1128@pixiil.com",
//   from: "waterholein@gmail.com",
//   subject: "Test email",
//   html: "<p><strong>This is test email</strong> from localhost:3000</p>",
// };

// sgMail
//   .send(email)
//   .then(() => console.log("Email send successfully"))
//   .catch((error) => console.log(error.message));

module.exports = sendEmail;