const express = require('express');
const {addTheme, delTheme, getAllTheme} = require('../controllers/admin.controller');

const adminRouter = express.Router();

adminRouter.post('/theme', addTheme);
adminRouter.delete('/theme/:id', delTheme);
adminRouter.get('/themes', getAllTheme);
adminRouter.post('/riddle', adminController.addQuestion); 
   















module.exports = adminRouter;

