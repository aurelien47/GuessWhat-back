const isAdmin = require('./isAdmin');
const verifyJwt = require('./verifyJwt');
const userAlreadyExist = require('./userAlreadyExist');
const verifyBodyRegister = require('./verifyBodyRegister');


module.exports = {isAdmin, verifyJwt, userAlreadyExist, verifyBodyRegister};