
const bcrypt = require('bcrypt');
const { User } = require("../models");

const userController = {

  // formulaire inscription
  async signupAction(req,res, next){      
    try {
      console.log("ici on est dans le controller, on a passé la vérification du body")
      const {
        username,
        email,
        password,
        passwordConfirm
      } = req.body;
      // une fois toute la vérif formulaire passé et validé on peut inscrire l'utilisateur
      // mais avant on chiffre le MDP
      encryptedPassword = await bcrypt.hash(password, 10);

      await User.create({
        username,
        email,
        password: encryptedPassword
      });

      res.status(201).json();
    
    }catch(err){
      next(err);
    }
  },

  // formulaire connexion
  async signinAction(req,res){
    const { email, password, remember } = req.body;
    const errors = [];
  
  if(!email || !password){
    errors.push('tous les champs sont obligatoires');
  }

  if(!emailValidator.validate(email)){
    errors.push("Format d'email invalide");
  }
  if(errors.length){
    return res.json({errors, post: {email}});
  }
  const user = await User.findOne({ where: {email} });

  // rester le plus flou possible sur l'objet de l'erreur
  if(!user){
    errors.push("Identifiants invalide")
  }else {
    // comparer le mot de passe enregistré en BDD (user.password) avec celui saisis par l'utilisateur 
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
      errors.push("Identifiants invalide")
    }
  }



  // une fois les vérif formualaire connexion passé et validé on peut connecter l'utilisateur
  
  // /!\ à voir si on gère les sessions
  
  res.status(200).json(user);

  },

}

module.exports = userController;