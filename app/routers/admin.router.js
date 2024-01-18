const express = require('express');
const {addTheme, delTheme, getAllTheme, addRiddle} = require('../controllers/admin.controller');
const themeAlreadyExist = require('../middlewares/themeAlreadyExist');
const adminController = require('../controllers/admin.controller');

const adminRouter = express.Router();

adminRouter.post('/theme', themeAlreadyExist, addTheme);
adminRouter.delete('/theme/:id', delTheme);
adminRouter.get('/themes', getAllTheme);
adminRouter.post('/riddle', addRiddle); 
   















module.exports = adminRouter;

