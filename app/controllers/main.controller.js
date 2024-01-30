//le contrôleur fournit la logique nécessaire pour gérer les requêtes liées aux thèmes dans l'application, 
//en utilisant Sequelize pour interagir avec la base de données et en gérant les réponses envoyées au client.




const { Theme } = require ("../models") // 1. on importe le model Theme pour pouvoir l'utiliser dans le controller  

const mainController = {

  async getAllTheme( _, res){ //méthode asynchrone est utilisée pour récupérer tous les thèmes de la base 
	//de données et les renvoyer au client.
	
		try {
			const themes = await Theme.findAll(); //La méthode findAll() est utilisée pour récupérer tous les thèmes de la base de données.
			res.status(200).json(themes); //La méthode json() est utilisée pour renvoyer les thèmes au client.

		} 
		catch (error) {
			console.error(error);
			res.status(500).json({ error: "Erreur lors de la récupération des thèmes"});
		}
	},

  async getOneTheme(req, res){ //méthode asynchrone est utilisée pour récupérer un thème 
	//spécifique de la base de données et le renvoyer au client.

    try {
      const theme = await Theme.findByPk(req.params.id, {include: { association: "riddles", include:"answers"}}); //La méthode findByPk() 
	  //est utilisée pour récupérer un thème spécifique de la base de données.
      
      if (!theme) { 
				return res.status(404).json({error: "Thème non trouvé "});
			}

      res.status(200).json(theme) 
    } catch (error) {
      console.error(error);
			res.status(500).json({ error: "Erreur lors de la récupération du thème"});
    }
  }
};




module.exports = mainController;



