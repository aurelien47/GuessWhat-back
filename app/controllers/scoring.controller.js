const { Play } = require('../models'); // on va chercher le model play pour les score en BDD

const scoringController = {
  async getScore (req, res){ 
    try {
      const userId = req.user.id; // Récupère l'ID de l'utilisateur depuis les données du token JWT

      const userScores = await Play.findAll({
        where: {
          userId: userId
        }
      });

      if (userScores.length === 0) {
        return res.status(404).json({ message: "Aucun score trouvé pour cet utilisateur" });
      }

      res.json(userScores);
    } catch (error) {
      console.error('Erreur dans scoring : ', error);
      res.status(500).json({ message: "Erreur lors de la récupération des scores" });
    }
  }
}


module.exports = { scoringController };


