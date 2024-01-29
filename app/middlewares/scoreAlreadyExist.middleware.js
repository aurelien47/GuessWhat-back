

const { User, Theme } = require('../models');

const verifyUserAndTheme = async (req, res, next) => {
  try {
    const userId = req.body.user_id || req.params.user_id;
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

module.exports = verifyUserAndTheme;
