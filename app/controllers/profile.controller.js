const {User} = require ('../models');   

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
            const user = await User.findByPk(req.params.id); 
            if (!user) {
                return res.status(404).send('Utilisateur non trouvé');
            }
    
            // Mettre à jour l'utilisateur avec req.body
            // Assurez-vous de valider et de nettoyer req.body avant de l'utiliser

            // Prévoir le cas d'une modificiation de mot de passe
            const updatedUser = await user.update(req.body);
            res.json(updatedUser);
        } catch (error) {
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




