
const {DataTypes, Model} = require('sequelize');
const database = require('../config/database');

class Riddle extends Model {

}

Riddle.init({
  content:{
    type: DataTypes.TEXT,
    allowNull: false,
  },
  wiki:{
    type: DataTypes.TEXT,
    allowNull:false,
  },
  indicator:{
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  },
},
{
  sequelize: database,
  tableName: 'riddles'
})

module.exports = Riddle;