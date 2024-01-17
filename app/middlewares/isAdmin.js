const { User } = require("../models");

const isAdmin = async (req, res, next) =>{
  const id = req.user.id;
  const user = await User.findByPk(id, {include: 'role'});
  if(user.role.name === "Admin"){
    next()
  }
  else{
    return res.status(403).json({error: "Ressources non autorisé"});
  }
}



module.exports = isAdmin;