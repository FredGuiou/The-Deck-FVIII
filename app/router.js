const express = require('express');
const router = express.Router();

const mainController = require('./controllers/mainController');
const searchController = require('./controllers/searchController');
const deckController = require('./controllers/deckController');

router.get('/', mainController.homePage);
router.get('/search', searchController.searchPage);
router.get('/cardDetail/:id', mainController.cardDetail);
router.get('/search/element', searchController.searchByElement);
router.get('/deck', deckController.displayDeck);
router.get('/deck/add/:id', deckController.addCard);
router.get('/deck/delete/:id', deckController.deleteCard);

module.exports = router;