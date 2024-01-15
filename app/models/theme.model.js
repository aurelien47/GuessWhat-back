const {DataTypes, Model} = require('sequelize');
const database = require('../config/database');

class Theme extends Model {

}

Theme.init({
  name:{
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  },
},
{
  sequelize: database,
  tableName: 'themes'
})

module.exports = Theme;