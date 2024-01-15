require('dotenv').config();
const { Theme } = require('../app/models')

const getAllThemes = async () => {
  const theme = await Theme.findAll({include: { association: "riddles", include:"answers"}});
  console.log("All theme:", JSON.stringify(theme, null, 2));
}

getAllThemes();