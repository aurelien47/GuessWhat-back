const jwt = require ("jsonwebtoken");

const verifyJwt = (req, res, next) => {
  const authorization = req.header("Authorization");
  if (!authorization) {
    return res.status(401).json({ error: 'Authorisation non trouvé' });
  }

  const token = authorization.split(' ')[1]
    if(!token) {
      return res.status(401).json({error: "Token manquant"});
    }

  try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decodedToken;
      next();
    } 
    catch (error) {
      return res.status(401).json({error: "Token invalide ou expiré"});
    }
};

module.exports = verifyJwt;