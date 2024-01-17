// on définit un modèle Sequelize pour représenter la table 'users' dans la BDD avec ses colonnes, cheminement similaire pour les autres models

// import des modules depuis le package "Sequelize" nécéssaire pour définir les types de données et créer un model
const {DataTypes, Model} = require('sequelize');

// import du fichier de configuration de la BDD contenant l'instance "Sequelize"
// necessite que 'database' soit une instance Sequelize déjà configuré
const database = require('../config/database');

// déclaration d'une classe 'User' qui étend la classe "Model" de Sequelize pour la table "users"
class User extends Model {

}

User.init({
  // email, username, password sont les colonnes de la tables "users" tous définit par un type "DataTypes."
  email:{
    type: DataTypes.TEXT,
    // spécifit que les colonnes ne peuvent pas être nulles
    allowNull: false,
    // spécifit que les valeurs dans ces colonnes seront uniques
    unique: true
  },
  username:{
    type: DataTypes.TEXT,
    allowNull:false,
    unique: true
  },
  role_id: {
    type: DataTypes.INTEGER,
    allowNull:false,
    defaultValue: 2
  },
  password:{
    type: DataTypes.TEXT,
    allowNull: false
  },
},
// objet en deuxième argument de 'init' pour configurer le modèle avec l'instance Sequelize 'database' et spécifit le nom de la table
{
  sequelize: database,
  tableName: 'users',
  defaultScope: {
    attributes: { exclude: ['password']}
  },
  scopes: {
    login: {
      attributes: {}
    }
  }
})

// export du modèle 'User' afin qu'il soit utiliser dans d'autres partie de l'application, comme d'autre modules pouvant intéragir en utilisant des méthodes de Sequelize tels que "findAll"
module.exports = User;