const checkDuplication = (array) => {
  // Initialisation de la variable 'duplicates' à false. 
  // Elle deviendra true si un doublon est trouvé.
  let duplicates = false;
  
  // Itération sur chaque élément du tableau 'answers'.
  // 'answer' est l'élément courant et 'index' est son index dans le tableau.
  array.forEach((answer, index) => {
      // Utilisation de la méthode 'some' sur le tableau 'answers'.
      // 'some' exécute une fonction de test pour chaque élément du tableau.
      if(!duplicates){
        duplicates = array.some((a, i) => i !== index && a.content === answer.content
        // 'a' est l'élément courant dans 'some' et 'i' est son index.
        // Vérification si l'index est différent de celui de 'forEach'
        // pour éviter de comparer l'élément avec lui-même.
        // Ensuite, vérification si le contenu de 'a' est égal à celui de 'answer'.
        // Si ces deux conditions sont vraies, 'some' retourne true, indiquant un doublon.;
    );
      }

  
      // Si un doublon est trouvé, 'some' retourne true et 'duplicates' devient true.
      // Notez que 'duplicates' sera défini sur true pour chaque doublon trouvé,
      // mais une fois qu'il est true, il restera true même si aucun autre doublon n'est trouvé.
  });
  
  // Affichage de la valeur de 'duplicates'. 
  // Elle sera true si au moins un doublon a été trouvé, sinon false.
  return duplicates;
  
  };

  module.exports = checkDuplication;