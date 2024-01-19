const { Theme, Riddle } = require('../models');


const adminController = {
	addTheme : async (req, res) => {
		try {
			const { body } = req
			const { name } = body;

			if (!name){
				return res.status(400).json({error: "Le champ 'Nom de thème est requis'"})
			}

			const theme = await Theme.create({
				name
			});
		

			res.status(201).json(theme);
		} 
		catch (error) {
				console.error(error);
				res.status(500).json({ error: 'Erreur lors de la création du thème'})
			}
	},

	delTheme: async(req, res) => {
		try {
			const themeId = req.params.id;
			const existTheme = await Theme.findByPk(themeId);

			if (!existTheme) {
				return res.status(404).json({error: "Thème non trouvé "});
			}

			await existTheme.destroy();
			res.sendStatus(204);
		} 
		catch (error) {
			console.error(error);
			res.status(500).json({ error: "Erreur lors de la récupération des thèmes"});
		}
	},

  addRiddle: async (req, res) => {
		try {
			const { content, wiki, indicator } = req.body;

			if (!content || !wiki || !indicator){
				return res.status(400).json({error: "Les champ sont requis"})
			}

			const riddle = await Riddle.create({
				content,
				wiki,
				indicator
			});
			res.status(201).json(riddle);
		} 
		catch (error) {
				console.error(error);
				res.status(500).json({ error: 'Erreur lors de la création de la devinette'})
			}
	},

	delRiddle: async(req, res) => {
		try {
			const riddleId = req.params.id;
			const existRiddle = await Riddle.findByPk(riddleId);

			if (!existRiddle) {
				return res.status(404).json({error: "Devinette non trouvé "});
			}

			await existRiddle.destroy();
			res.sendStatus(204);
		} 
		catch (error) {
			console.error(error);
			res.status(500).json({ error: "Erreur lors de la récupération des Devinette"});
		}
	},
};


	











module.exports = adminController;