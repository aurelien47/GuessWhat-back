const jwt = require('jsonwebtoken');

const verifyScoreAccess = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // on récupère le token dans le header de la requête
  console.log('token scoring recuperation ', token);
  
  if (!token) {
    return res.status(401).json({ message: "Accès refusé, token non fourni" });
  }
  console.log('token present ', token);
  
  try {
    const verifiedUser = jwt.verify(token, process.env.JWT_SECRET); // on vérifie le token avec la clé secrète
    req.user = verifiedUser; // on stocke le user dans la requête, les donnée du token(roleetc..) sont dans verifieUser
    console.log('token scoring req.user ', req.user);
    // y a t'il besoin de vérifier le rôle de l'utilisateur ? c'esdt bien un player qui a le droit de voir son score ?

    next(); // on Passe au scoring.controlleur si tout est en ordre

  } catch (error) {
    res.status(400).json({ message: "Token invalide" });
    console.log('catch', error);
  }
  
};

module.exports = verifyScoreAccess;
