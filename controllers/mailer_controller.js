const { User } = require('../models')

//system will send activation email when user register
//after user click link verify, status user will be changed to active 
const verify = async (req, res,next) => {
    const userId =  req.params.userId
    //change isActive to true
    const payload ={
      isActive :"true"
    }
    await User.update(payload, {
      where: {
        id: userId,
      },
    });
    res.status(200).send("Your Account has been Activated");
}

module.exports = {verify}