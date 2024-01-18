const express = require('express');
const mainController = require('../controllers/main.controller');
const {signupAction, signinAction} = require('../controllers/user.controller');
const verifyBodyRegister = require('../middlewares/verifyBodyRegister');
const userAlreadyExist = require('../middlewares/userAlreadyExist');
const { Theme } = require("../models");
const {verifyJwt, isAdmin} = require("../middlewares");


const authRouter = express.Router();

//router.get('/', mainController.homePage);

authRouter.route('/signup')
  .post(verifyBodyRegister, userAlreadyExist, signupAction);

authRouter.route('/signin')
  .post(signinAction);

/*router.get('/themes', verifyJwt, isAdmin, async (req, res)  => {
    const themes = await Theme.findAll();
    res.json(themes);
  })*/

module.exports = authRouter;