const express = require('express');
const authRouter = require('./auth.router');
const adminRouter = require('./admin.router');
const verifyJwt = require('../middlewares/verifyJwt');
const isAdmin = require('../middlewares/isAdmin');

const router = express.Router();
router.use(authRouter);
router.use('/admin', verifyJwt, isAdmin, adminRouter);

















module.exports = router;





