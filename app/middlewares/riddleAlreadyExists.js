const { Answer, Riddle } = require('../models');

const riddleAlreadyExist = async (req, res, next) => {
  const alreadyExistIndicator = await Riddle.findOne({
    where : {
        indicator : req.body.indicator
    }
  });

  if(alreadyExistIndicator) {
      return res.status(400).json({error : 'Cet indice existe déjà !'})
  };

  const alreadyExistAnswer = await Answer.findOne({
    where: {
      content: req.body.content
    }
  });

  if(alreadyExistAnswer) {
    return res.status(400).json({error : 'Une des réponses existe déjà !'})
    }

  next();

}


module.exports = riddleAlreadyExist;