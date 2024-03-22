const nodemailer = require("nodemailer");
const { User, Address } = require('../models')

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
    // user: process.env.NODEMAILER_EMAIL,
    // pass: process.env.NODEMAILER_PASS,
      user: "kookadeveloper@gmail.com",
      pass: "qiyr qwkv biwn sgzf",
    },
  });

const sendEmail = async (userId, email) => {
    const checkUser = await User.findByPk(userId,
        {
            include: 'address',
            attributes: ['id', 'userName', 'email','phoneNumber', 'firstName', 'lastName', 'role'],
        })
    if(checkUser){
        let accountName = checkUser.dataValues.firstName
        let linkVerify = "http://localhost:9000/api/v1.0/verify/"+userId
        const info = await transporter.sendMail({
            from: "ardecandra@gmail.com", // sender address
            to: email, // list of receivers
            subject: "Verify Your Account", // Subject line
            html: "<p><strong>Hello "+accountName+"</strong> <br>You registered an account on Binar Platinum, before being able to use your account you need to verify that this is your email address by clicking here: <br></p><a href="+linkVerify+">Click Here to Confirm Your Account</a><p>Kind Regards</p>"
          });
    }
    console.log(email,"<<<<<EMAIL>>>>>")

    return resultSendEmail
}

module.exports = {sendEmail}

