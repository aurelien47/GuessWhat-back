const bcrypt = require('bcrypt');
const { User } = require('../models');
const generateToken = require('../utils/generateToken');


const userController = {

  // formulaire inscription
  async signupAction(req, res, next){      
    try {
      console.log("ici on est dans le controller, on a passé la vérification du body")
      const { username, email, password } = req.body;
      
      // une fois toute la vérif formulaire passé et validé on peut inscrire (enregistrer) l'utilisateur en BDD
      // mais avant on chiffre le MDP
      encryptedPassword = await bcrypt.hash(password, 10);

      await User.create({
        username,
        email,
        password: encryptedPassword
      });

      res.status(201).json({status: 'success'});
    
    }catch(err){
        console.error(err);
        return res.status(401).json({ error: "le nom d'utilisateur ou l'email est déjà utilisé"});
    }
      
    },

  // formulaire connexion
  async signinAction (req,res) {
    try {

    const { email, password  } = req.body;
  
    const user = await User.scope("login").findOne({ where: {email} });

    // rester le plus flou possible sur l'objet de l'erreur
    if(!user){
      return res.status(401).json({error:"Identifiants invalides"})
    } else {
      // comparer le mot de passe enregistré en BDD (user.password) avec celui saisis par l'utilisateur 
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if(!isPasswordValid){
        return res.status(401).json({error:"Identifiants invalides"})
      }
    }
      // une fois les vérif formualaire connexion passé et validé on peut connecter l'utilisateur
      // /!\ à voir si on gère les sessions
    console.log(user);

    //delete user.dataValues.password;


  const token = generateToken(user); 

  res.status(200).json({token});

  }catch(error){
    console.error(err);
    return res.status(500).json({ error: err});
  }

},
}

module.exports = userController;