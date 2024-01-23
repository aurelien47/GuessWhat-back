const { Theme, Riddle } = require('../models');


const adminController = {
	async addTheme(req, res, next){
		try {
			const { body } = req
			const { name } = body;

			if (!name){
				return res.status(400).json({error: "Le champ 'Nom de thème est requis'"})
			};

			const theme = await Theme.create({
				name
			});
		

			res.status(201).json({status: 'success'});
		} 
		catch (error) {
				console.error(error);
				next(error);
				res.status(500).json({ error: 'Erreur lors de la création du thème'})
			}
	},

	async delTheme(req, res){
		try {
			const themeId = req.params.id;
			const existTheme = await Theme.findByPk(themeId);

			if (!existTheme) {
				return res.status(404).json({error: "Thème non trouvé "});
			};

			await existTheme.destroy();
			res.sendStatus(204);
		} 
		catch (error) {
			console.error(error);
			res.status(500).json({ error: "Erreur lors de la récupération des thèmes"});
		}
	},

  async addRiddle(req, res, next){
		try {
			const theme_id = req.params.id;
			const { content, wiki, indicator, answers } = req.body;

			// vérif si le thème existe ??? nécéssaire ?
			/*const theme = await Theme.findByPk(theme_id);
			if (!theme) {
				return res.status(400).json({ error: "Le thème spécifié n'existe pas." });
			};*/

			const riddle = await Riddle.create({
				content,
				wiki,
				indicator,
				theme_id
			});

			await Promise.all(
				answers.map(async (answer) => {
					await riddle.createAnswer({
						content: answer.content,
						is_good_answer: answer.is_good_answer,
					});
				})
			);
	
			// await riddle.addAnswers(answers);
			return res.status(201).json({status: 'success'});
		} 
		catch (error) {
				console.error(error);
				next(error);
				return res.status(500).json({ error: 'Erreur lors de la création de la devinette'})
			}
	},


	async delRiddle(req, res){
		try {
			const riddleId = req.params.id;
			const riddle = await Riddle.findByPk(riddleId, {
				include: 'answers'
			});

			if (!riddle) {
				return res.status(404).json({error: "Cette devinette a déjà été supprimé"});
			};

			await Promise.all(
				riddle.answers.map(
					answer => answer.destroy()
				)
			);

			await riddle.destroy();
			res.sendStatus(204);
		} 
		catch (error) {
			console.error(error);
			res.status(500).json({ error: "Erreur lors de la récupération des Devinette"});
		}
	}	
};


	











module.exports = adminController;