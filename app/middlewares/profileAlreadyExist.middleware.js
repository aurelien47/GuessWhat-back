const { User } = require('../models');

const profileAlreadyExist = async (req, res, next) => {
    const alreadyExistEmail = await User.findOne({
        where : {
            email : req.body.email
        }
    });

    if(alreadyExistEmail) {
        return res.status(400).json({error : 'Un utilisateur avec cet email existe déjà !'})
    };

    const alreadyExistUsername = await User.findOne({
        where : {
            username : req.body.username
        }
    });

    if(alreadyExistUsername) {
        return res.status(400).json({error : 'Un utilisateur avec ce pseudo existe déjà !'})
    }

    next();
};

module.exports = profileAlreadyExist;