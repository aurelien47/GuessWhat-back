// ce middleware est un contrôle de sécurité pour s'assurer qu'un thème avec le même nom n'est pas créé plusieurs fois dans la base de données. 
// Il vérifie si le nom du thème est fourni et s'il est unique avant de permettre à la requête de continuer.



const { Theme } = require('../models'); // 1. on importe le model Theme pour pouvoir l'utiliser dans le middleware  (const { Theme } = require('../models');)

const themeAlreadyExist = async (req, res, next) => { // 2. on crée une fonction asynchrone qui prend en paramètre req, res et next (const themeAlreadyExist = async (req, res, next) => {) 
    
    if(!req.body.name) { // 3. on vérifie que le champ name est bien rempli (if(!req.body.name) {return res.status(412).json({error: "Le champ name est obligatoire"})})
        return res.status(412).json({error: "Le champ name est obligatoire"})
    }

    try { // 4. on vérifie que le thème n'existe pas déjà en BDD (const alreadyExistTheme = await Theme.findOne({where : {name : req.body.name}});)
    const alreadyExistTheme = await Theme.findOne({
        where : {
                name : req.body.name
        }
    });

    if(alreadyExistTheme) { // 5. si le thème existe déjà on renvoie une erreur (if(alreadyExistTheme) 
        return res.status(400).json({error : 'Ce thème existe déjà!'})
    };

    next(); // 6. si le thème n'existe pas on passe au middleware suivant (next();)
    } catch (error) { // 7. on gère les erreurs 
        return res.status(500).json(error);
    }
};

module.exports = themeAlreadyExist; // 8. on exporte le middleware, pour l'mporter et l'utiliser dans le router, onl'importe egalement dans le controlleur admin et main.




   
  







   

