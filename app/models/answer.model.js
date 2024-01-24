const {DataTypes, Model} = require('sequelize');
const database = require('../config/database');

class Answer extends Model {

}

Answer.init({
  content:{
    type: DataTypes.TEXT,
    allowNull: false
  },
  is_good_answer:{
    type: DataTypes.BOOLEAN,
    allowNull:false
  },
},
{
  sequelize: database,
  tableName: 'answers',
  indexes: [{unique: true, fields:['content', 'riddle_id']}]
})

module.exports = Answer;