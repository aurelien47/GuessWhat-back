const express = require('express');
const mainController = require ('../controllers/main.controller')

const mainRouter = express.Router();

mainRouter.get('/themes', mainController.getAllTheme);
mainRouter.get('/theme/:id', mainController.getOneTheme);




module.exports = mainRouter;