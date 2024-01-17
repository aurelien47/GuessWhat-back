const express = require('express');
const adminController = require('../controllers/admin.controller');

const adminRouter = express.Router();

adminRouter.post('/themes', adminController.addTheme);

   















module.exports = adminRouter;

