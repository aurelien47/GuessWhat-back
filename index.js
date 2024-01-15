require('dotenv').config();
const { Theme } = require('./app/models')

const express = require('express');

const app = express();

const port = process.env.PORT || 3000;
console.log("bonjour", process.env.PORT);
app.get('/', (req, res) => { res.send('Hello World!') } );

app.get('/themes', async (req, res)  => {
  const themes = await Theme.findAll();
  res.json(themes);
})

app.get('/theme/:id', async (req, res) => {
  const theme = await Theme.findByPk(req.params.id, {include: { association: "riddles", include:"answers"}});
  res.json(theme)
})

app.listen(port, () => { console.log(`Server running on port ${port}`) } );      
