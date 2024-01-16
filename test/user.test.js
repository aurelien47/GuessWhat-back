// script de test pour récupérer tous les utilisateur de la BDD incluant leur données associés

// charge les variables d'environnement depuis le fichier .env
require('dotenv').config();
// import du modèle 'User'
const { User } = require('../app/models');

// déclaration d'une fonction asynchrone afin de récupérer tous les utilisateursde la BDD
const getAllUsers = async () => {
  // spécifit à Sequelize d'inclure les informations du rôle pour chaque utilisateurs
  const users = await User.findAll({include:"role"});
  // affiche les utilisateurs récupérés au format Json
  // la fonction JSON.stringify indique que l'objet "users" doit être converti en chaine JSON avec indentation de 2 espace pour améliorer la lisibilité
  console.log("All users:", JSON.stringify(users, null, 2));
} ;

// appel de la fonction, déclenchant l'exécution du script
getAllUsers();