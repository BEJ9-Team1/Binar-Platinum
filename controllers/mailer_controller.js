const mailerService = require('../services/mailer_services')
const sequelize = require('sequelize')
const { User, Address } = require('../models')

//system will send activation email when user register
//after user click link verify, status user will be changed to active 
const verify = async (req, res,next) => {
    const userId =  req.params.userId
    const checkUser = await User.findByPk(userId,
      {
          attributes: ['id','isActive'],
      })
    //change isActive to true
    const payload ={
      isActive :"true"
    }
    const updateIsActive = await User.update(payload, {
      where: {
        id: userId,
      },
    });
    res.status(200).send("Your Account has been Activated");
}

module.exports = {verify}