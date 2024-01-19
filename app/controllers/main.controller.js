const { Theme } = require ("../models")

const mainController = {

  getAllTheme: async(req, res) => {
		try {
			const themes = await Theme.findAll();
			res.json(themes);
		} 
		catch (error) {
			console.error(error);
			res.status(500).json({ error: "Erreur lors de la récupération des thèmes"});
		}
	},

  getOneTheme: async (req, res) => {
    const theme = await Theme.findByPk(req.params.id, {include: { association: "riddles", include:"answers"}});
    res.json(theme)
  }
};




module.exports = mainController;