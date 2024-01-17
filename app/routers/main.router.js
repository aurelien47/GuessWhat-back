const express = require('express');
const mainController = require('../controllers/main.controller');
const userController = require('../controllers/user.controller');
const verifyBodyRegister = require('../middlewares/verifyBodyRegister');
const userAlreadyExist = require('../middlewares/userAlreadyExist');
const { Theme } = require("../models");
const verifyJwt = require("../middlewares/verifyJwt");
const isAdmin = require('../middlewares/isAdmin');

const router = express.Router();

//router.get('/', mainController.homePage);

router.route('/signup')
  .post(verifyBodyRegister, userAlreadyExist, userController.signupAction);

router.route('/signin')
  .post(userController.signinAction);

/*router.get('/themes', verifyJwt, isAdmin, async (req, res)  => {
    const themes = await Theme.findAll();
    res.json(themes);
  })*/

module.exports = router;