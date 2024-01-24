const { Theme } = require('../models');
const checkDuplication = require("../utils/checkDuplication");

const verifyBodyRiddle = async (req, res, next) => {
  const { 
    content, 
    wiki, 
    indicator, 
    answers 
  } = req.body;
  console.log("ici on est dans le middleware de vérification du body");
  
  const theme_id = req.params.id;
  const theme = await Theme.findByPk(theme_id);
    if (!theme) {
      return res.status(400).json({ error: "Le thème spécifié n'existe pas." });
    };

  if (!content || !wiki || !indicator || !answers){
    return res.status(400).json({error: "Tous les champs sont requis"})
  };

  // Vérifier s'il y a bien 5 réponses dans le tableau answers
  if (answers.length !==5) {
    return res.status(400).json({error: "Il doit y avoir exactement 5 reponses"});
  };

  // vérifier si toutes les réponses sont bien formatées
  const validAnswers = answers.every(answer => answer.content && typeof answer.is_good_answer === 'boolean');

    if (!validAnswers) {
      return res.status(400).json({ error: "Chaque réponse doit avoir une propriété 'content' et 'is_good_answer'" });
    };

  // vérifier s'il y a bien une bonne réponse dans le tableau
  const correctAnswers = answers.filter(answer => answer.is_good_answer);// filtrer les reponses correctes
			
    if (correctAnswers.length !== 1) {
      return res.status(400).json({ error: "Il doit y avoir une et une seule bonne réponse" }); // verifier qu'il y ai une seule bonne reponse
    };

    if (checkDuplication(answers)) {
      return res.status(400).json( {error: "Chaque réponse doit être unique"});
    }
    
  next();

}



module.exports = verifyBodyRiddle;