const dataMapper = require('../dataMapper.js');

const searchController = {
  searchPage: (req, res) => {
    res.render('search');
  },

  searchByElement: async (request, response, next) => {
    const element = request.query.element;

    try {
      //On récupère l'élément et le données des cartes choisi dans une constante
      const cards = await dataMapper.getCardsByElements(element);
      if (cards) {
        //On renvoie la vue des cartes choisies
        response.render('cardList', {
          cards, title: 'Liste des cartes recherchées ' + (element === 'null' ? ' sans élément' : `d'élément ${element}`)
        });
      } else {
        //Sinon on envoit une rreur 404 et pon pourrait même faire une vue spécifique.
        response.status(404).send("Il y a un problème avec votre recherche");
      }
    } catch (error) {
      //Si le try génère une erreur on renvoit une erreur.
      console.error(error);
      response.status(500).send("Il y a un problème dans le searchController/searchByElement");
    }
  }
};

module.exports = searchController;