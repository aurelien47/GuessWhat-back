const { Theme } = require('../models');

const themeAlreadyExist = async (req, res, next) => {
    
    if(!req.body.name) {
        return res.status(412).json({error: "Le champ name est obligatoire"})
    }

    try {
    const alreadyExistTheme = await Theme.findOne({
        where : {
                name : req.body.name
        }
    });

    if(alreadyExistTheme) {
        return res.status(400).json({error : 'Ce thème existe déjà!'})
    };

    next();
    } catch (error) {
        return res.status(500).json(error);
    }
};

module.exports = themeAlreadyExist;