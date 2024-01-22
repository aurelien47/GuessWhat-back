const express = require('express');
const {addTheme, delTheme, addRiddle, delRiddle} = require('../controllers/admin.controller');
const themeAlreadyExist = require('../middlewares/themeAlreadyExist');

const adminRouter = express.Router();

adminRouter.post('/theme', themeAlreadyExist, addTheme);
adminRouter.delete('/theme/:id', delTheme);
adminRouter.post('/theme/:id/riddle', addRiddle);
adminRouter.delete('/theme/:id/riddle/:id', delRiddle); 
   















module.exports = adminRouter;