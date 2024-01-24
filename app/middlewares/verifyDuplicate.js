const checkDuplication = (req, res, next) => {

    let answersArray = req.body.answers;

    let verif = answersArray.some(x => answersArray.indexOf(x) !== answersArray.lastIndexOf(x));

    if (verif(answersArray)) {
        console.log("Duplicate elements found.");
        return res.status(400).json({ error: "Attention : Duplicate elements found." });
    }
    else {
        console.log("No Duplicates found.");
    }
    next();
}

module.exports = checkDuplication;