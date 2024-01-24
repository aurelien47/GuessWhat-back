
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
    allowNull: false
  },
},
{
  sequelize: database,
  tableName: 'riddles',
  indexes: [{unique: true, fields:['content', 'theme_id']}]
})

module.exports = Riddle;