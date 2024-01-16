require('dotenv').config;
const { Answer } = require('../app/models')

const getAllAnswers = async () => {
  const answer = await Answer.findAll();
  console.log("All answers:", JSON.stringify(answer, null, 2));
}

getAllAnswers();