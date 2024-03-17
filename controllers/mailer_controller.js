const nodemailer = require("nodemailer");
require('dotenv').config();


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASS,
  },
});

// async..await is not allowed in global scope, must use a wrapper
 function mailer(userEmail) {
  // send mail with defined transport object
  return   transporter.sendMail({
    from: '"Robbi Foo Koch 👻" <vickyrobbi@gmail.com>', // sender address
    to: "arrorobbi@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

mailer().then(console.error);

module.exports = mailer