// ici on définit des associations entre les modèles pour représenter la BDD relationnelle dans l'application, cela reflète les relations entre les entités de l'app

// Import des différent modèles, définits plus bas, cela représente les entités spécifique à l'application
const User = require ('./user.model');
const Role = require ('./role.model');
const Theme = require ('./theme.model');
const Answer = require ('./answer.model');
const Riddle = require ('./riddle.model');
const Play = require ('./play.model');

// on établi les associations entre modèles avec les méthodes d'association de Sequelize

// ici un role peut avoir plusieur utilisateurs
Role.hasMany(User, {
  foreignKey: "role_id",
  as: "users"
});
// et un utilisateur appartient à un seul role
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


// export des tous les modèles définis pour être utilisé par d'autres parties de l'application
module.exports = { User, Role, Theme, Answer, Riddle, Play };