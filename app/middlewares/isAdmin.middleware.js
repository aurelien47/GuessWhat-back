//ce middleware isAdmin est conçu pour être utilisé dans les routes de l'application  
//où une vérification des droits d'administrateur est nécessaire. 
// seuls les utilisateurs avec un rôle d'administrateur peuvent accéder à certaines parties de l'application.

const { User } = require("../models");

const isAdmin = async (req, res, next) =>{ //fonction qui vérifie si l'utilisateur actuel a le rôle d'administrateur.

  const id = req.user.id; //extrait l'ID de l'utilisateur à partir de l'objet req.user. 

  const user = await User.findByPk(id, {include: 'role'}); //recherche l'utilisateur dans la base de données et inclut 
  //le rôle associé à l'utilisateur

  if(user.role.name === "Admin"){ //vérifie si le rôle de l'utilisateur est "Admin"
    next()
  }
  else{
    return res.status(403).json({error: "Ressources non autorisé"});
  }
};



module.exports = isAdmin;