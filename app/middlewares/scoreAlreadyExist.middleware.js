const { User, Theme } = require('../models');

const scoreAllReadyExist = async (req, res, next) => {
  console.log(req.user)
  try {
    const userId = req.user.id;
    const themeId = req.body.theme_id || req.params.theme_id;

    const userExists = await User.findByPk(userId);
    const themeExists = await Theme.findByPk(themeId);

    if (!userExists || !themeExists) {
      return res.status(404).json({ message: "Utilisateur ou thème introuvable" });
    }

    next();

  } catch (error) {
    console.error('Erreur ', error);
    res.status(500).json({ message: "Erreur de vérification" });
  }
};

module.exports = scoreAllReadyExist;
