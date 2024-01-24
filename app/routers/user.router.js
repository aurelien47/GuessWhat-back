const express = require('express'); // on importe express                              
const router = express.Router(); // creation routeur avec express.Router() 
//const userProfile = require('../controllers/profile.controller'); // on importe userprofile controller
const verifyProfile = require('../middlewares/verifyUserProfile'); // on importe userProfile middleware
const{ getUserProfile, modifyOneUserProfile, deleteOneUserProfile } = require('../controllers/profile.controller'); // on importe getUserProfile controller


router.get('/profile/:id', verifyProfile, getUserProfile); // verifyJWT sera exécuté en premier pour s'assurer que l'utilisateur 
//est authentifié avant de permettre l'accès à modifyOneUserProfile  

router.put('/profile/:id', verifyProfile, modifyOneUserProfile); // route pour que l'user modifie son profile
// execution de verifyJWT pour l'authentification et userProfileMiddleware pour s'assurer que l'utilisateur ne modifie que son propre profil.

router.delete('/profile/:id', verifyProfile, deleteOneUserProfile); // route pour que l'user supprime son profile

module.exports = router; // on exporte le router




