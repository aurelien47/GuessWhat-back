const express = require('express');
const { getAllTheme, getOneTheme } = require ('../controllers/main.controller');

const mainRouter = express.Router();

mainRouter.get('/themes', getAllTheme);
mainRouter.get('/theme/:id', getOneTheme);




module.exports = mainRouter;