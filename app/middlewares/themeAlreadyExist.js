const { Theme } = require('../models');

const themeAlreadyExist = async (req, res, next) => {
    const alreadyExistTheme = await Theme.findOne({
        where : {
             name : req.body.name
        }
    });

    if(alreadyExistTheme) {
        return res.status(400).json({error : 'Ce thème existe déjà!'})
    };

    next();
};

module.exports = themeAlreadyExist;