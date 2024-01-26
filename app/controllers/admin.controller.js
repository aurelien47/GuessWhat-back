const { Theme, Riddle, Answer } = require('../models');


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
			res.status(200).json({status: 'success'});
		} 
		catch (error) {
			console.error(error);
			res.status(500).json({ error: "Erreur lors de la récupération des thèmes"});
		}
	},

  async addRiddle(req, res){
		try {
			const theme_id = req.params.id;
			const { content, wiki, indicator, answers } = req.body;

			const riddle = await Riddle.create({
				content,
				wiki,
				indicator,
				theme_id
			});
			const answersToCreate = answers.map((answer) => {
				return {
					...answer,
					riddle_id: riddle.id
				}
			})
			const createdAnswers = await Answer.bulkCreate(answersToCreate);
			console.log(`les réponses créé pour la riddle avec l'id ${riddle.id}`, createdAnswers)
			return res.status(201).json({status: 'success'});
		} 
		catch (error) {
				console.error(error);
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

			await riddle.destroy(); //vu qu'on est en ondelete cascade cela supprimera les answer liéé
			res.status(200).json({status: 'success'});;
		} 
		catch (error) {
			console.error(error);
			res.status(500).json({ error: "Erreur lors de la récupération des Devinette"});
		}
	}	
};


	











module.exports = adminController;