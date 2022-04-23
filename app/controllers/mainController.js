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
    //On récupère l'Id et on la parseInt car c'est un string que l'on passe en number.
    const cardId = parseInt(request.params.id, 10);
    //on fait une demande au dataMapper.
    try {
      const card = await dataMapper.getCard(cardId);
      //Si il y a correspondance alors on renvoie la vue avec la carte sur laquelle on a cliqué est la seule à apparaitre.
      if (card) {
        response.render('cardDetail', { card });
      } else {
        //Sinon status 404 et on pourrait même créer une vue à cet effet.
        response.status(404).send("Cette carte n'existe pas");
      }
    } catch (error) {
      //Si la requete au dataMapper génère une erreur alors on envoit un message avec code erreur 500.
      console.error(error);
      response.status(500).send("Il y a un problème dasn le mainController/cardDetail");
    }
  }
  
};

module.exports = mainController;