const { Theme } = require ("../models")

const mainController = {

  async getAllTheme( _, res){
		try {
			const themes = await Theme.findAll();
			res.status(200).json(themes);

		} 
		catch (error) {
			console.error(error);
			res.status(500).json({ error: "Erreur lors de la récupération des thèmes"});
		}
	},

  async getOneTheme(req, res){
    try {
      const theme = await Theme.findByPk(req.params.id, {include: { association: "riddles", include:"answers"}});
      
      if (!theme) {
				return res.status(404).json({error: "Thème non trouvé "});
			}

      res.status(200).json(theme)
    } catch (error) {
      console.error(error);
			res.status(500).json({ error: "Erreur lors de la récupération du thème"});
    }
  }
};




module.exports = mainController;