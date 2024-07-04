const jwt = require('jsonwebtoken');

module.exports = (user) => {
  const token = jwt.sign({
    id: user.id, 
    username: user.username,
    role: user.role.name // Inclure le rôle dans le token
  },
  process.env.JWT_SECRET,
  {
    expiresIn : "8h"
  });
  return token;
}