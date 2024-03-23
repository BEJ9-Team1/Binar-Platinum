const nodemailer = require("nodemailer");
const { User, Address } = require('../models')

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASS,
    // user: NODEMAILER_EMAIL,
    // pass: "qiyr qwkv biwn sgzf",
  },
});

const sendEmail = async (receiver) => {
    let accountName = receiver.dataValues.firstName
    let linkVerify = "http://128.199.246.107:3005/api/v1.0/verify/" + receiver.dataValues.id
    const info = await transporter.sendMail({
      from: process.env.NODEMAILER_EMAIL, // sender address
      to: receiver.dataValues.email, // list of receivers
      subject: "Verify Your Account", // Subject line
      html: "<p><strong>Hello " + accountName + "</strong> <br>You registered an account on Binar Platinum, before being able to use your account you need to verify that this is your email address by clicking here: <br></p><a href=" + linkVerify + ">Click Here to Confirm Your Account</a><p>Kind Regards</p>"
    });

}

module.exports = { sendEmail }

