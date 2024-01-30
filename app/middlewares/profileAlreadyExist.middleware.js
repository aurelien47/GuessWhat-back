const { User } = require ('../models');


const profileAlreadyExist = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ["password","id", "username", "email"]
    }); 
  
    if (!user) {
      return res.status(404).json({error:'Utilisateur non trouvé'});
    }
    console.log('user', user.password)
    req.user = user;

    next();

  } catch (error) {
    return res.status(400).json({error: 'Le profil existe déjà'})
  }


}

module.exports = profileAlreadyExist;