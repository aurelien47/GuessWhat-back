const express = require('express'); // on importe express                              
const router = express.Router(); // creation routeur avec express.Router() 
const { getScore } = require('../controllers/scoring.controller'); // on importe le controller scoring
const { scoringMiddleware} = require('../middlewares'); // on importe le middleware scoringMiddleware  







router.get('/scrore', scoringMiddleware, getScore); // passe par scoringMiddleware avant d'aller dans le controller scoring

module.exports = router; // on exporte le router scoringRouter