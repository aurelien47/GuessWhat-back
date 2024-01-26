const { User } = require ('../models');  
const bcrypt = require('bcrypt'); 
const { Op } = require('sequelize');

const profileController = {             

    async getUserProfile (req, res) {
        try {
            const userId = req.params.id;
            console.log('user id', userId);
            const existUser = await User.findByPk(userId);
            console.log('existUser', existUser);
            
            if (!existUser) {
                return res.status(404).json({error: "Utilisateur non trouvé "});
            };
            res.status(200).json(existUser);
        } 
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erreur lors de la récupération de l'utilisateur"});
        }
    },

    async modifyOneUserProfile (req, res) {
        try {
            const user = await User.findByPk(req.params.id, {
                attributes: ["password","id", "username", "email"]
            }); 
            
            if (!user) {
                return res.status(404).send('Utilisateur non trouvé');
            }
            console.log('user', user.password)

            // Mettre à jour l'utilisateur avec req.body
            // Assurez-vous de valider et de nettoyer req.body avant de l'utiliser
            
            let updatedData = req.body;


            // Pseudo 
            if(updatedData.username) {
                console.log('updatedData', updatedData);
                // Vérifier si le nouveau pseudo est identique aux données actuelles de l'utilisateur
                if (user.username === updatedData.username) {
                    return res.status(400).send("Vous avez saisi le même pseudo qu'auparavant.");
                }
    
                // Vérifier si le nouveau pseudo existe déjà pour un autre utilisateur
                const existUsername = await User.findOne({
                    where: {
                        username: updatedData.username,
                        id: {[Op.not]: req.params.id } // Exclure l'utilisateur actuel de la recherche
                    }
                });

                if (existUsername) {
                    return res.status(400).send("Ce pseudo est déjà utilisé par un autre utilisateur.");
                }
            }
            
            // Email
            if(updatedData.email) {
                console.log('updatedData', updatedData);
                // Vérifier le nouvel email est identique aux données actuelles de l'utilisateur
                if (user.email === updatedData.email) {
                    return res.status(400).send("Vous avez saisi le même mail qu'auparavant.");
                }

                // Vérifier si le nouvel email existe déjà pour un autre utilisateur
                const existEmail = await User.findOne({
                    where: {
                        username: updatedData.email,
                        id: {[Op.not]: req.params.id } // Exclure l'utilisateur actuel de la recherche
                    }
                });

                if (existEmail) {
                    return res.status(400).send("Cet email est déjà utilisé par un autre utilisateur.");
                }
            }
            
            // Prévoir le cas d'une modificiation de mot de passe
            if(updatedData.password) {
                console.log('updatedData', updatedData);
                const isSamePassword = await bcrypt.compare(updatedData.password, user.password); //metode .compare

                if (isSamePassword) {
                    return res.status(400).send("Le nouveau mot de passe ne peut pas être le même que l'actuel.");
                }
                updatedData.password = await bcrypt.hash(updatedData.password, 10);
            }
            
            await user.update(updatedData);
            await user.save();
            res.status(201).json({status: 'success'});

        } catch (error) {
            console.error(error);
            res.status(500).send('Erreur lors de la modification du profil');
        }
    },

    async deleteOneUserProfile (req, res) {        

        try {               
    
            const user = await User.findByPk(req.params.id); 
            if (!user) {
                return res.status(404).send('Utilisateur non trouvé');
            }   
    
            await user.destroy();
            res.status(204).send('Utilisateur supprimé');
        }   
        catch (error) {
            res.status(500).send('Erreur lors de la suppression du profil');
        }
    },
};  







module.exports = profileController;