const { User } = require ('../models');  


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
            return res.status(200).json(existUser);
        } 
        catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erreur lors de la récupération de l'utilisateur"});
        }
    },

    async modifyOneUserProfile (req, res) {
        try {
            // Mettre à jour l'utilisateur avec req.body
            // Assurez-vous de valider et de nettoyer req.body avant de l'utiliser
            
            const user = req.user;
            let updatedData = req.body;
            console.log('user instance of User', user instanceof User);
            console.log('req.body password', updatedData.password);

            await user.update(updatedData);
            await user.save();
            return res.status(201).json({status: 'success'});

        } catch (error) {
            console.error(error);
            return res.status(500).json({error: 'Erreur lors de la modification du profil'});
        }
    },

    async deleteOneUserProfile (req, res) {        

        try {               
            const user = req.user;
            await user.destroy();
            return res.status(200).json({status: 'Utilisateur supprimé'});
        }   
        catch (error) {
            return res.status(500).json({error: 'Erreur lors de la suppression du profil'});
        }
    },
};  







module.exports = profileController;