const express = require('express');
const mainController = require('../controllers/main.controller');
const userController = require('../controllers/user.controller');
const verifyBodyRegister = require('../middlewares/verifyBodyRegister');
const userAlreadyExist = require('../middlewares/userAlreadyExist');

const router = express.Router();

//router.get('/', mainController.homePage);

router.route('/signup')
  .post(verifyBodyRegister, userAlreadyExist, userController.signupAction);

router.route('/signin')
  .post(userController.signinAction);

module.exports = router;