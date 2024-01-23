const express = require('express'); // on importe express                              
const router = express.Router(); // creation routeur avec express.Router() 
const userProfile = require('../controllers/profile.controller'); // on importe userprofile controller
const userProfileMiddleware = require('../middlewares/userProfileMiddleware'); // on importe userProfile middleware



router.get('/profile/:id', userProfileMiddleware, userProfile.getUserProfile); // verifyJWT sera exécuté en premier pour s'assurer que l'utilisateur 
//est authentifié avant de permettre l'accès à modifyOneUserProfile  

router.put('/profile/:id', userProfileMiddleware, userProfile.modifyOneUserProfile); // route pour que l'user modifie son profile
// execution de verifyJWT pour l'authentification et userProfileMiddleware pour s'assurer que l'utilisateur ne modifie que son propre profil.

router.delete('/profile/:id', userProfileMiddleware, userProfile.deleteOneUserProfile); // route pour que l'user supprime son profile

module.exports = router; // on exporte le router




