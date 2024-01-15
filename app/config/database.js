const {Sequelize} = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, 
  {
    define:{
      timestamps: true,
      underscored: true
    }
  });


const main = async ()=>{
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

main();

module.exports = sequelize;