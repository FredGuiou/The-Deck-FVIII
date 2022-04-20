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
  }
};

module.exports = mainController;