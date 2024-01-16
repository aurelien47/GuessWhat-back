const express = require('express');
const userController = require('../controllers/user.controller');



const router = express.Router();

//router.get('/', mainController.homePage);

router.route('/signup')
  .post(userController.signupAction);

router.route('/signin')
  .post(userController.signinAction);

module.exports = router;