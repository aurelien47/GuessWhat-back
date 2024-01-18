const express = require('express');
const authRouter = require('./auth.router');
const adminRouter = require('./admin.router');

const {isAdmin, verifyJwt} = require('../middlewares');

const router = express.Router();
router.use(authRouter);
router.use('/admin', verifyJwt, isAdmin, adminRouter);

















module.exports = router;





