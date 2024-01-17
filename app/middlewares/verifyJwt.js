const jwt = require ("jsonwebtoken");

const verifyJwt = (req, res, next) => {
  const authorization = req.header("Authorization");
  try {
    const token = authorization.split(' ')[1]
    if(!token) {
      return res.status(401).json({error: "Authorisation non validé"});
    }
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decodedToken;
    } catch (error) {
      return res.status(401).json({error: "Authorisation non validé"});
    }
  next();
}

module.exports = verifyJwt;