const express = require('express');
const {signupAction, signinAction} = require('../controllers/user.controller');
const verifyBodyRegister = require('../middlewares/verifyBodyRegister.middleware');
const userAlreadyExist = require('../middlewares/userAlreadyExist.middleware');


const authRouter = express.Router();


authRouter.route('/signup')
  .post(verifyBodyRegister, userAlreadyExist, signupAction);

authRouter.route('/signin')
  .post(signinAction);






module.exports = authRouter;