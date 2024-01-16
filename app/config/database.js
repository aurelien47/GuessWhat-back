/* utilisation de la bibliothèque "Sequelize" pour intéragir avec la BDD relationnelle (PostgreSQL) */

// import du module "Sequelize"
const {Sequelize} = require('sequelize');

// création d'une instance de "Sequelize" en utilisant l'URL de la variable d'environnement 'DATABASEURL'
const sequelize = new Sequelize(process.env.DATABASE_URL, 
  {
    //les options passées définissent le conportement par défaut
    define:{
      timestamps: true,
      underscored: true
    }
  });

// déclaration d'une fonction asynchrone
// gestion des erreurs avec le bloc try-catch
const main = async ()=>{
  try {
    // tentative de connexion avec la méthode 'authenticate' de Sequelize
    await sequelize.authenticate();
    // si connexion établie un message est affiché
    console.log('Connection has been established successfully.');
  } catch (error) {
    // en cas d'échec un message d'erreur est affiché avec les détails
    console.error('Unable to connect to the database:', error);
  }
};

// appel de la fonction main() pour exécuter le processus de connexion à la BDD 
main();

// exportation de l'instance "Sequelize" permettant à d'autres modules de l'utiliser afin d'intéragir avec la BDD
module.exports = sequelize;