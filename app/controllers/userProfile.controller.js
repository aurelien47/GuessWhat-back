const {user} = require('../models/user.model');   

const userProfileController = {             

    getUserProfile: async (req, res) => {
        try {
            const userId = req.params.id;
            const existUser = await user.findByPk(userId);
            if (!existUser) {
                return res.status(404).json({error: "Utilisateur non trouvé "});
            };
            res.status(200).json(existUser);
        } 
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erreur lors de la récupération de l'utilisateur"});
        }
    }                   
};  


modifyOneUserProfile = async (req, res) => {
    try {
        const user = await db.User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).send('Utilisateur non trouvé');
        }

        // Mettre à jour l'utilisateur avec req.body
        // Assurez-vous de valider et de nettoyer req.body avant de l'utiliser
        const updatedUser = await user.update(req.body);
        res.json(updatedUser);
    } catch (error) {
        res.status(500).send('Erreur lors de la modification du profil');
    }
};

deleteOneUserProfile = async (req, res) => {        

    try {               

        const user = await db.User.findByPk(req.params.id); 
        if (!user) {
            return res.status(404).send('Utilisateur non trouvé');
        }   

        await user.destroy();
        res.status(204).send('Utilisateur supprimé');
    }   
    catch (error) {
        res.status(500).send('Erreur lors de la suppression du profil');
    }
}



module.exports = userProfileController;




