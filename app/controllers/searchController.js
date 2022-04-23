const dataMapper = require('../dataMapper.js');

const searchController = {
  searchPage: (req, res) => {
    res.render('search');
  },

  searchByElement: async (request, response, next) => {
    const element = request.query.element;

    try {
      const cards = await dataMapper.getCardsByElements(element);
      if (cards) {
        response.render('cardList', {
          cards, title: 'Liste des cartes recherchées'
        });
      } else {
        response.send("Il n'y a pas de carte à afficher car vous avez sélectionné AUCUN dans le menu déroulant.");
      }
    } catch (error) {
      console.error(error);
      response.status(500).send("Il y a un problème dans le searchController/searchByElement");
    }
  }
};

module.exports = searchController;