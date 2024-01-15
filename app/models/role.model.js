const {DataTypes, Model} = require('sequelize');
const database = require('../config/database');

class Role extends Model {

}

Role.init({
  name:{
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  }
},
{
  sequelize: database,
  tableName: 'roles'
})

module.exports = Role;