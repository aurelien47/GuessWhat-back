const express = require('express'); // on importe express                              
const router = express.Router(); // creation routeur avec express.Router() 
const userProfile = require('../controllers/userProfile.controller'); // on importe userprofile controller


router.get('/profile', userProfile.getAllUserProfile); // on crée une route pour récupérer tous les userprofiles

router.get('/profile/:id', userProfile.getOneUserProfile); // on crée une route pour récupérer un userprofile

router.post('/profile', userProfile.createOneUserProfile); // on crée une route pour créer un userprofile

router.put('/profile/:id', userProfile.modifyOneUserProfile); // on crée une route pour modifier un userprofile

router.delete('/profile/:id', userProfile.deleteOneUserProfile); // on crée une route pour supprimer un userprofile

module.exports = router; // on exporte le router

