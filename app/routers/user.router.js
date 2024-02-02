const express = require('express'); // on importe express                              
const router = express.Router(); // creation routeur avec express.Router() 
//const userProfile = require('../controllers/profile.controller'); // on importe userprofile controller
const { verifyUserProfile, profileAlreadyExist, verifyBodyProfile, scoreAllReadyExist} = require('../middlewares'); // on importe userProfile middleware
const{ getUserProfile, modifyOneUserProfile, deleteOneUserProfile } = require('../controllers/profile.controller'); // on importe getUserProfile controller
const { getUserPlayHistory, addPlay, getAllBestPlayByTheme } = require('../controllers/playing.controller');


/******* Gestion Profile **********/

router.get('/profile/:id', verifyUserProfile, getUserProfile); // verifyJWT sera exécuté en premier pour s'assurer que l'utilisateur 
//est authentifié avant de permettre l'accès à modifyOneUserProfile  

router.put('/profile/:id', verifyUserProfile, profileAlreadyExist, verifyBodyProfile,  modifyOneUserProfile); // route pour que l'user modifie son profile
// execution de verifyJWT pour l'authentification et userProfileMiddleware pour s'assurer que l'utilisateur ne modifie que son propre profil.

router.delete('/profile/:id', verifyUserProfile, profileAlreadyExist, deleteOneUserProfile); // route pour que l'user supprime son profile


/********* Gestion sessions de jeux ********/

// Enregistrer les sessions de jeu (score, indice utilisé, nb erreur)
router.post('/play', scoreAllReadyExist, addPlay); // passe par scoringMiddleware avant d'aller dans le controller scoring

// Récupère l'archivage de toutes les session pour un profil
router.get('/profile/:id/play', getUserPlayHistory); // passe par scoringMiddleware avant d'aller dans le controller scoring

// Page classement en fonction du thème
router.get('/theme/:id/play', getAllBestPlayByTheme);



module.exports = router; // on exporte le router