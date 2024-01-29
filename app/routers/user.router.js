const express = require('express'); // on importe express                              
const router = express.Router(); // creation routeur avec express.Router() 
//const userProfile = require('../controllers/profile.controller'); // on importe userprofile controller
const { verifyUserProfile, scoreAllReadyExist } = require('../middlewares'); // on importe userProfile middleware
const{ getUserProfile, modifyOneUserProfile, deleteOneUserProfile } = require('../controllers/profile.controller'); // on importe getUserProfile controller
const { getUserAllScore, addScore, getScoreByTheme } = require('../controllers/playing.controller');


/******* Gestion Profile **********/

router.get('/profile/:id', verifyUserProfile, getUserProfile); // verifyJWT sera exécuté en premier pour s'assurer que l'utilisateur 
//est authentifié avant de permettre l'accès à modifyOneUserProfile  

router.put('/profile/:id', verifyUserProfile, modifyOneUserProfile); // route pour que l'user modifie son profile
// execution de verifyJWT pour l'authentification et userProfileMiddleware pour s'assurer que l'utilisateur ne modifie que son propre profil.

router.delete('/profile/:id', verifyUserProfile, deleteOneUserProfile); // route pour que l'user supprime son profile


/********* Gestion sessions de jeux ********/

router.post('/play', scoreAllReadyExist, addScore); // passe par scoringMiddleware avant d'aller dans le controller scoring

router.get('/:id/play', getUserAllScore); // passe par scoringMiddleware avant d'aller dans le controller scoring

router.get('/play/theme/:id',  scoreAllReadyExist, getScoreByTheme);



module.exports = router; // on exporte le router




