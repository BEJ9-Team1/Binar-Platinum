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

const sendEmail = async (user) => {
    // const checkUser = await User.findByPk(user.,
    //     {
    //         include: 'address',
    //         attributes: ['id', 'userName', 'email','phoneNumber', 'firstName', 'lastName', 'role'],
    //     })
    // if(checkUser){
        let accountName = user.firstName
        let linkVerify = "http://localhost:3000/api/v1.0/verify/"+user.id
        const info = await transporter.sendMail({
            from: "ardecandra@gmail.com", // sender address
            to: user.email, // list of receivers
            subject: "Verify Your Account", // Subject line
            html: "<p><strong>Hello "+accountName+"</strong> <br>You registered an account on Binar Platinum, before being able to use your account you need to verify that this is your email address by clicking here: <br></p><a href="+linkVerify+">Click Here to Confirm Your Account</a><p>Kind Regards</p>"
          });
    // }
    
  }

module.exports = { sendEmail }

