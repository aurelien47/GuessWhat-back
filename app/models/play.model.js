const {DataTypes, Model} = require('sequelize');
const database = require('../config/database');

class Play extends Model {

}

Play.init({
  score:{
    type: DataTypes.INTEGER,
    allowNull: false
  },
  errors:{
    type: DataTypes.INTEGER,
  },
  count_indicators:{
    type: DataTypes.INTEGER,
  }
},
{
  sequelize: database,
  tableName: 'play'
})

module.exports = Play;