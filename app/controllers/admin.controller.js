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

	/*
        addTheme : async (req, res) => {
		try {
			const { name } = req.body;

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
		} 
		catch (error) {
			console.error(error);
			res.status(500).json({ error: "Erreur lors de la récupération des thèmes"});
		}
	},

	// riddle

        getAllTheme: async(req, res) => {
		try {
			const themes = await Theme.findAll();
			res.json(themes);
		} 
		catch (error) {
			console.error(error);
			res.status(500).json({ error: "Erreur lors de la récupération des thèmes"});
		}
	}   */


};


	











module.exports = adminController;