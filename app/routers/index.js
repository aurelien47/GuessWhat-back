const express = require('express');
const authRouter = require('./auth.router');
const adminRouter = require('./admin.router');
const mainRouter = require('./main.router');

const {isAdmin, verifyJwt} = require('../middlewares');

const router = express.Router();



// Route normal
router.use(mainRouter);

// route pour l'authentification
router.use(authRouter);
router.use('/admin', verifyJwt, isAdmin, adminRouter);

















module.exports = router;