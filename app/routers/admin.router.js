const express = require('express');
const adminController = require('../controllers/admin.controller');

const adminRouter = express.Router();

adminRouter.post('/theme', adminController.addTheme);
adminRouter.delete('/theme/:id', adminController.delTheme);
adminRouter.get('/themes', adminController.getAllTheme);
   















module.exports = adminRouter;

