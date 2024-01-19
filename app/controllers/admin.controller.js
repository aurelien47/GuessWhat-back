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
			const theme_id = req.params.id;
			const { content, wiki, indicator, answers } = req.body;

			if (!content || !wiki || !indicator || !answers){
				return res.status(400).json({error: "Les champ sont requis"})
			}
			
			

			// Vérifier s'il y a bien 5 réponses dans le tableau answers 
			// vérifier s'il y a bien une bonne réponse dans le tableau
			// vérifier si toutes les réponses sont bien formatées (json ?)

      if (answers.length !==5) {
				return res.status(400).json({error: "il doit y avoir exactement 5 reponses"}); //(??) ou et le tabelau ? comment le créer  ? 
			}

			const correctAnswers = answers.filter(answer => answer.isCorrect);// filtrer les reponses correctes

			if (correctAnswers.length !== 1) {
				return res.status(400).json({ error: "Il doit y avoir une et une seule bonne réponse" }); // verifier qu'il y ai une seule bonne reponse
			}

			const riddle = await Riddle.create({
				content,
				wiki,
				indicator,
				theme_id
			});

			// await riddle.addAnswers(answers);
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