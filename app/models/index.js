const User = require ('./user.model');
const Role = require ('./role.model');
const Theme = require ('./theme.model');
const Answer = require ('./answer.model');
const Riddle = require ('./riddle.model');
const Play = require ('./play.model');

Role.hasMany(User, {
  foreignKey: "role_id",
  as: "users"
});
User.belongsTo(Role, {
  foreignKey: "role_id",
  as: "role"
})

Theme.hasMany(Riddle, {
  foreignKey: "theme_id",
  as: "riddles"
})
Riddle.belongsTo(Theme, {
  foreignKey: "theme_id",
  as: "theme"
})

Riddle.hasMany(Answer, {
  foreignKey: "riddle_id",
  as: "answers"
})
Answer.belongsTo(Riddle, {
  foreignKey: "riddle_id",
  as: "riddle"
})

//Association d'une partie et d'un user
User.hasMany(Play, {
  foreignKey: "user_id",
  as: "games"
})
Play.belongsTo(User, {
  foreignKey: "user_id",
  as: "player"
})


//Association d'une partie et d'un theme
Theme.hasMany(Play, {
  foreignKey: "theme_id",
  as: "partys"
})
Play.belongsTo(Theme, {
  foreignKey: "theme_id",
  as: "quiz"
})



module.exports = { User, Role, Theme, Answer, Riddle, Play };