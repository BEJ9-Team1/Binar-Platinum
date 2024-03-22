const router = require('express').Router();
const mailerController = require('../controllers/mailer_controller')

router.get('/verify/:userId', mailerController.verify);
module.exports= router