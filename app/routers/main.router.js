const express = require('express');
const { getAllTheme, getOneTheme } = require ('../controllers/main.controller');
const {  scoreAllReadyExist} = require('../middlewares'); // on importe le middleware scoringMiddleware  


const mainRouter = express.Router();

mainRouter.get('/themes', getAllTheme);
mainRouter.get('/theme/:id', getOneTheme);
mainRouter.get('/leaderboard/theme/:id', scoreAllReadyExist, getAllScore);




module.exports = mainRouter;