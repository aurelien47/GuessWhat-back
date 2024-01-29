const isAdmin = require('./isAdmin.middleware');
const verifyJwt = require('./verifyJwt.middleware');
const userAlreadyExist = require('./userAlreadyExist.middleware');
const verifyBodyRegister = require('./verifyBodyRegister.middleware');
const themeAlreadyExist = require('./themeAlreadyExist.middleware');
const verifyBodyRiddle = require('./verifyBodyRiddle.middleware');
const riddleAlreadyExist = require('./riddleAlreadyExist.middleware');
//const verifyDuplicate = require('./OLD_verifyDuplicate.middleware');
const verifyUserProfile = require('./verifyUserProfile.middleware');



module.exports = {isAdmin, verifyJwt, userAlreadyExist, verifyBodyRegister, themeAlreadyExist, verifyBodyRiddle, riddleAlreadyExist, /*verifyDuplicate,*/ verifyUserProfile};

