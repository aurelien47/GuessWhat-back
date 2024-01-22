const { Theme, Riddle, Answer } = require('../models');


const adminController = {
	addTheme : async (req, res) => {
		try {
			const { body } = req
			const { name } = body;

			if (!name){
				return res.status(400).json({error: "Le champ 'Nom de thème est requis'"})
			};

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
			};

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

			const theme = await Theme.findByPk(theme_id);
			if (!theme) {
				return res.status(400).json({ error: "Le thème spécifié n'existe pas." });
			};

			if (!content || !wiki || !indicator || !answers){
				return res.status(400).json({error: "Tous les champs sont requis"})
			};
			
			const alreadyExistIndicator = await Riddle.findOne({
        where : {
            indicator : req.body.indicator
        }
			});

			if(alreadyExistIndicator) {
					return res.status(400).json({error : 'Cet indice existe déjà !'})
			};

			// Vérifier s'il y a bien 5 réponses dans le tableau answers
			if (answers.length !==5) {
				return res.status(400).json({error: "Il doit y avoir exactement 5 reponses"}); //(??) ou et le tabelau ? comment le créer  ? 
			};


			// Voir avec Amory pour al contrainte d'unicité sur les réponses
			/*
			for (const answer of answers) {
				const alreadyExistAnswer = await Answer.findOne({
					where: {
						content: answer.content
					},
				});
				if(alreadyExistAnswer) {
					return res.status(400).json({error : 'Une des réponses existe déjà !'})
				};
			};*/

			/*const alreadyExistAnswer = await Answer.findOne({
        where : {
            content : req.body.content
        }
			});*/

			// vérifier si toutes les réponses sont bien formatées (json ?)
			const validAnswers = answers.every(answer => answer.content && typeof answer.is_good_answer === 'boolean');

			if (!validAnswers) {
				return res.status(400).json({ error: "Chaque réponse doit avoir une propriété 'content' et 'isCorrect'" });
			};

			// vérifier s'il y a bien une bonne réponse dans le tableau
			const correctAnswers = answers.filter(answer => answer.is_good_answer);// filtrer les reponses correctes
			
			if (correctAnswers.length !== 1) {
				return res.status(400).json({ error: "Il doit y avoir une et une seule bonne réponse" }); // verifier qu'il y ai une seule bonne reponse
			};


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