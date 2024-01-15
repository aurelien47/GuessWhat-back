require('dotenv').config();
const { User } = require('../app/models');

const getAllUsers = async () => {
  const users = await User.findAll({include:"role"});
  console.log("All users:", JSON.stringify(users, null, 2));
} ;

getAllUsers();