const emailValidator = require ("email-validator");
const { passwordStrength } = require('check-password-strength');

const verifyBodyRegister = (req, res, next) => {
    const {
        username,
        email,
        password,
        passwordConfirm
      } = req.body;
      console.log("ici on est dans le middleware de vérification du body")
      const errors = [];
      

      /****** vérification formulaire *******/
      if(!username || !email || !password || !passwordConfirm){
        errors.push('Tous les champs sont obligatoires');
        console.log('check body', errors);
      }

      if(!emailValidator.validate(email)){
        errors.push("Format d'email invalide");
        console.log('check validate email', errors);
      }

      // force medium
      if(passwordStrength(password).id < 2){
        errors.push('Mot de passe insuffisant');
        console.log('check password strength', errors);
      }

      if(passwordConfirm !== password){
        errors.push('Les mots de passe ne correspondent pas');
        console.log('check password', errors);
      }

      if(errors.length){
        console.log(errors);
        return res.status(400).json({errors, post: req.body});
        
      };
      next();
}

module.exports = verifyBodyRegister;