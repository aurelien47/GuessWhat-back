const { Riddle } = require('../models');

const riddleAlreadyExist = async (req, res, next) => {
   
    try {
    const alreadyExistRiddle = await Riddle.findOne({
        where : {
                content : req.body.content,
                theme_id : req.params.id
        }
    });

    if(alreadyExistRiddle) {
        return res.status(400).json({error : 'Cette devinette existe déjà dans ce thème!'})
    };

    next();
    } catch (error) {
        return res.status(500).json({ error: 'Erreur lors de la vérification de l\'existence de la devinette' });
    }
};

module.exports = riddleAlreadyExist;