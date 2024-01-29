const { Play } = require('../models'); // on va chercher le model play pour les score en BDD

const scoringController = {
  async getUserAllScore (req, res){ 
    try {
      const userId = req.user.id; // Récupère l'ID de l'utilisateur depuis les données du token JWT

      const userScores = await Play.findAll({
        where: {
          user_id: userId
        }
      });

      // if (userScores.length === 0) {
        // return res.status(404).json({ message: "Aucun score trouvé pour cet utilisateur" });
     // }

      res.json(userScores);
    } catch (error) {
      console.error('Erreur dans scoring : ', error);
      res.status(500).json({ message: "Erreur lors de la récupération des scores" });
    }
  },

  

    async addScore (req, res) { 
      try {
        const userId = req.user.id;
        const  score  = req.body.score; // verifier que l'user exist et verifier que le theme existe avec les associations
        const themeId = req.body.theme_id;

        const newScore = await Play.create({
          score: score,
          user_id: userId,
          theme_id: themeId
        });

        res.status(201).json(newScore);
      } catch (error) {
        console.error('Erreur dans scoreAdd : ', error);
        res.status(500).json({ message: "Erreur lors de l'ajout du score" });
      }
    },

    async getScoreByTheme (req, res) { 
      try {
        const themeId = req.params.theme_id;
        const themeScores = await Play.findAll({
          where: {
            theme_id: themeId
          }
        });
  
        if (themeScores.length === 0) {
          return res.status(404).json({ message: "Aucun score trouvé pour ce thème" });
        }
  
        res.json(themeScores);
      } catch (error) {
        console.error('Erreur dans scoreByTheme : ', error);
        res.status(500).json({ message: "Erreur lors de la récupération des scores" });
      }
    },

    
    async getAllScore (_, res) { 
      try {
        const allScores = await Play.findAll();
  
        if (allScores.length === 0) {
          return res.status(404).json({ message: "Aucun score trouvé" });
        }
  
        res.json(allScores);
      } catch (error) {
        console.error('Erreur dans allScore : ', error);
        res.status(500).json({ message: "Erreur lors de la récupération des scores" });
      }
    },

  }
  
  











module.exports = scoringController ;


