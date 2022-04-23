const dataMapper = require('../dataMapper.js');

const mainController = {
  homePage: (req, res) => {
    dataMapper.getAllCards( (err, results) => {
      if(err) {
        console.error(err);
        return;
      } 
      res.render('cardList', {
        cards: results.rows,
        title: 'Liste des cartes'
      })
    });
  },

  cardDetail: async (request, response, next) => {
    
    const cardId = parseInt(request.params.id, 10);
    
    try {
      const card = await dataMapper.getCard(cardId);
      
      if (card) {
        response.render('cardDetail', { card });
      } else {
        
        response.status(500).send("Cette carte n'existe pas");
      }
    } catch (error) {
      console.error(error);
      response.status(500).send("Il y a un problème dasn le mainController/cardDetail");
    }
  }
  
};

module.exports = mainController;