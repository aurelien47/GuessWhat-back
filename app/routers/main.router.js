const express = require('express');



const router = express.Router();

router.get('/', mainController.homePage);

router.route('/signup')
  .get(userController.signup)
  .post(userController.signupAction);

router.route('/signin')
  .get(userController.signin)
  .post(userController.signinAction);

router.get('/signout', userController.signout);


module.exports = router;