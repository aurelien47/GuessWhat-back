// s'assurer que l'utilisateur qui fait la requete est bien celui qui est autorisé à accéder à son profil

const verifyProfile = (req, res, next) => {
    const { id } = req.params; // on récupère l'id du profile utilisateur
    console.log('middleware id', id);
    const { id : userId } = req.user; //extration de l'id du user dans le token (req.user)
    console.log('middleware userId', userId);

    if (parseInt(id, 10) !== userId) { // si l'id du userprofile est différent de l'id du user dans le token (req.user)
        return res.status(403).json({error : 'Vous n\'avez pas l\'autorisation de modifier ce profil!'}); // on renvoie une erreur
    };

    next(); // sinon on passe au middleware suivant si les conditions sont respectées 
}                                                           

module.exports = verifyProfile;

