const jwt = require('jsonwebtoken');

module.exports = (user) => {
  const token = jwt.sign({
    id: user.id, 
    username: user.username
  },
  process.env.JWT_SECRET,
  {
    expiresIn : "8h"
  });
  return token;
}