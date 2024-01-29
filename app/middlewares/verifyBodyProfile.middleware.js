const { User } =  require('../models');
const bcrypt = require('bcrypt'); 
const { Op } = require('sequelize');


const verifyBodyProfile = async (req, res ,next) => {
  try {
    let updatedData = req.body;
    const user = req.user;
    // Pseudo 
    if(updatedData.username) {
      console.log('updatedData', updatedData);
      // Vérifier si le nouveau pseudo est identique aux données actuelles de l'utilisateur
      if (user.username === updatedData.username) {
          return res.status(400).json({error: "Vous avez saisi le même pseudo qu'auparavant."});
      }

      // Vérifier si le nouveau pseudo existe déjà pour un autre utilisateur
      const existUsername = await User.findOne({
          where: {
              username: updatedData.username,
              id: {[Op.not]: req.params.id } // Exclure l'utilisateur actuel de la recherche
          }
      });

      if (existUsername) {
          return res.status(400).json({error: "Ce pseudo est déjà utilisé par un autre utilisateur."});
      }
    }

    // Email
    if(updatedData.email) {
      console.log('if modif email');
      // Vérifier le nouvel email est identique aux données actuelles de l'utilisateur
      if (user.email === updatedData.email) {
        console.log('if modif email et le même que précédemment');
          return res.status(400).json({error: "Vous avez saisi le même mail qu'auparavant."});
      }

      // Vérifier si le nouvel email existe déjà pour un autre utilisateur
      const existEmail = await User.findOne({
          where: {
              email: updatedData.email,
              id: {[Op.not]: req.params.id } // Exclure l'utilisateur actuel de la recherche
          }
      });

      if (existEmail) {
        console.log('if modif email et le même qu"un autre user');
          return res.status(400).json({error: "Cet email est déjà utilisé par un autre utilisateur."});
      }
    }

    // Prévoir le cas d'une modificiation de mot de passe
    if(updatedData.password) {
      console.log('updatedData', updatedData);
      const isSamePassword = await bcrypt.compare(updatedData.password, user.password); //metode .compare

      if (isSamePassword) {
          return res.status(400).json({error: "Le nouveau mot de passe ne peut pas être le même que l'actuel."});
      }
      updatedData.password = await bcrypt.hash(updatedData.password, 10);
    }

    next();

  } catch (error) {
    return res.status(500).json({ error: error.message || error })
  }

}

module.exports = verifyBodyProfile;
