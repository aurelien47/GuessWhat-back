const express = require('express');
const { getAllTheme, getOneTheme } = require ('../controllers/main.controller');
const { scoreAllReadyExist } = require('../middlewares'); // on importe le middleware scoringMiddleware  
const { getLeaderboard } = require('../controllers/playing.controller');


const mainRouter = express.Router();

mainRouter.get('/themes', getAllTheme); //route pour récupérer tous les thèmes qui appel la fonction getAllTheme du controller main.controller.js
mainRouter.get('/theme/:id', getOneTheme); //route pour récupérer un thème specifique en fonctino de l'identifiant qui appel la fonction getOneTheme du controller main.controller.js

mainRouter.get('/theme/:id/leaderboard', getLeaderboard); // Leaderboard page accueil




module.exports = mainRouter;