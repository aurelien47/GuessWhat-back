


const{Theme} = require('../models');

const adminController = {
   addTheme : async (req, res) => {
        const theme = await Theme.create(req.body);
        res.json(theme);
        },
};












module.exports = adminController;