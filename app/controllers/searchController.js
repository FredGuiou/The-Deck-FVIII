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
          cards, title: 'Liste des cartes recherchées ' + (element === 'null' ? ' sans élément' : `d'élément ${element}`)
        });
      } else {
        response.status(500).send("Il y a un problème avec votre recherche");
      }
    } catch (error) {
      console.error(error);
      response.status(500).send("Il y a un problème dans le searchController/searchByElement");
    }
  }
};

module.exports = searchController;