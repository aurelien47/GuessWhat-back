require('dotenv').config();

const { User } = require('../app/models');


const getAllUsers = async () => {
    console.log('1')
  const users = await User.findAll({include:"role"});
  console.log('2');
  console.log("All users:", JSON.stringify(users, null, 2));

} ;

// console.log('avant la promesse : 1');
// appel de la fonction, déclenchant l'exécution du script
console.log('0');
getAllUsers();
console.log('3');
//     .then((users) =>   console.log("All users: 2"));

//     console.log('après la promesse: 3');