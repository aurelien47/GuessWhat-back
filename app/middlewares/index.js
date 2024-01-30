//l'index des middlewares est utilisé comme un point d'entrée pour toutes les middlewares de l'application.

//impotation des middlewares
const isAdmin = require('./isAdmin.middleware');
const verifyJwt = require('./verifyJwt.middleware');
const userAlreadyExist = require('./userAlreadyExist.middleware');
const verifyBodyRegister = require('./verifyBodyRegister.middleware');
const themeAlreadyExist = require('./themeAlreadyExist.middleware');
const verifyBodyRiddle = require('./verifyBodyRiddle.middleware');
const riddleAlreadyExist = require('./riddleAlreadyExist.middleware');
const verifyUserProfile = require('./verifyUserProfile.middleware');
const profileAlreadyExist = require('./profileAlreadyExist.middleware');
const verifyBodyProfile = require('./verifyBodyProfile.middleware');
const scoreAllReadyExist = require('./scoreAlreadyExist.middleware');


//exportation des middlewares
module.exports = { 
  isAdmin, 
  verifyJwt, 
  userAlreadyExist, 
  verifyBodyRegister, 
  themeAlreadyExist, 
  verifyBodyRiddle, 
  riddleAlreadyExist, 
  verifyUserProfile,
  profileAlreadyExist,
  verifyBodyProfile,
  scoreAllReadyExist
};

