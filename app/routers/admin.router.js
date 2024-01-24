const express = require('express');
const { addTheme, delTheme, addRiddle, delRiddle } = require('../controllers/admin.controller');
const { themeAlreadyExist, verifyBodyRiddle, riddleAlreadyExist } = require('../middlewares')

const adminRouter = express.Router();

adminRouter.post('/theme', themeAlreadyExist, addTheme);
adminRouter.delete('/theme/:id', delTheme);
adminRouter.post('/theme/:id/riddle', verifyBodyRiddle, riddleAlreadyExist, addRiddle);
adminRouter.delete('/theme/:id/riddle/:id', delRiddle); 
   















module.exports = adminRouter;