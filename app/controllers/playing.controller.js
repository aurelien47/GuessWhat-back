const { Play, User, Theme } = require('../models'); // on va chercher le model play pour les score en BDD
const { Sequelize } = require('sequelize');

const playingController = {
  async getUserPlayHistory (req, res){ 
    try {
      const user_id = req.user.id; // Récupère l'ID de l'utilisateur depuis les données du token JWT

      const gameHistory = await Play.findAll({
        attributes: ['id', 'score', 'errors', 'count_indicators', 'createdAt'],
        include: [{
          model: Theme,
          attributes: ['name'],
          as: 'quiz'
        }],
        where: { user_id },
        order: [['createdAt', 'DESC']]
      });

      // if (userScores.length === 0) {
        // return res.status(404).json({ message: "Aucun score trouvé pour cet utilisateur" });
     // }

      res.json(gameHistory);
    } catch (error) {
      console.error('Erreur dans scoring : ', error);
      res.status(500).json({ message: 'Erreur lors de la récupération de l\'historique' });
    }
  },

  

    async addPlay(req, res) { 
      try {
        const user_id = req.user.id;
        const  { theme_id, score, errors, count_indicators }  = req.body; // verifier que l'user exist et verifier que le theme existe avec les associations

        // Enregistrement d'un session de Devinette (theme)
        const newPlay = await Play.create({
          score,
          errors,
          count_indicators,
          user_id,
          theme_id
        });

        res.status(201).json(newPlay);
      } catch (error) {
        console.error('Erreur dans scoreAdd : ', error);
        res.status(500).json({ message: "Erreur lors de l'ajout du score" });
      }
    },

    async getLeaderboard (req, res) { 
      try {
        const theme_id = req.params.id;
        
        const topScores = await Play.findAll({
          include: 'player',
          where: {
            theme_id
          },
          order: [
            ['score', 'DESC']
          ],
          limit: 3
        });
  
        if (topScores.length === 0) {
          return res.status(404).json({ message: "Aucun score trouvé pour ce thème" });
        }
  
        res.json(topScores);
      } catch (error) {
        console.error('Erreur dans scoreByTheme : ', error);
        res.status(500).json({ message: "Erreur lors de la récupération des scores" });
      }
    },

    
    async getAllBestPlayByTheme (req, res) { 
      try {
        const { theme_id } = req.params
        
        const theme = await Theme.findByPk(theme_id);

        if(!theme){
          return res.status(404).json({error: 'Le thème spécifié n\'existe pas'});
        }

        const bestPlays = await Play.findAll({
          attributes: [[Sequelize.fn('MAX', Sequelize.col('score')), 'maxScore'], 'errors', 'count_indicators'],
          include: [{
            model: User,
            attributes: ['username']
            }],
          where: {
            theme_id
          },
          order: [['score', 'DESC']]
        })

        if (bestPlays.length === 0) {
          return res.status(404).json({ message: "Aucun score trouvé" });
        }
  
        res.json(bestPlays);
      } catch (error) {
        console.error('Erreur dans bestPlays : ', error);
        res.status(500).json({ message: "Erreur lors de la récupération des scores" });
      }
    },

  }
  
  











module.exports = playingController;


