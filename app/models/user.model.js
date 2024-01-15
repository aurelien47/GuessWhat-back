const {DataTypes, Model} = require('sequelize');
const database = require('../config/database');

class User extends Model {

}

User.init({
  email:{
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  },
  username:{
    type: DataTypes.TEXT,
    allowNull:false,
    unique: true
  },
  password:{
    type: DataTypes.TEXT,
    allowNull: false
  },
},
{
  sequelize: database,
  tableName: 'users'
})

module.exports = User;