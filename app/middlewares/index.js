const isAdmin = require('./isAdmin');
const verifyJwt = require('./verifyJwt');
const userAlreadyExist = require('./userAlreadyExist');
const verifyBodyRegister = require('./verifyBodyRegister');
//const themeAlreadyExist


module.exports = {isAdmin, verifyJwt, userAlreadyExist, verifyBodyRegister};