//ce middleware isAdmin est conçu pour être utilisé dans les routes de l'application  
//où une vérification des droits d'administrateur est nécessaire. 
// seuls les utilisateurs avec un rôle d'administrateur peuvent accéder à certaines parties de l'application.

const { User } = require("../models");

const isAdmin = async (req, res, next) =>{ //fonction qui vérifie si l'utilisateur actuel a le rôle d'administrateur.
  const userId = req.user.id; // ID utilisateur stocké dans le token JWT
  try {
    const user = await User.findByPk(userId, {include: 'role'}); //recherche l'utilisateur dans la base de données et inclut 
    //le rôle associé à l'utilisateur
    //console.log('mes données', user);
    if(!user){
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    if (user.role.name === 'Admin') { // Vérifiez le nom du rôle
      next();
    } else {
      return res.status(403).json({ error: "Erreur: utilisateur ne possède pas les droits d'administration" });
    }
  } 
  catch (error) {
    return res.status(500).json({ error: 'Erreur interne' });
  }
  
};



module.exports = isAdmin;