//J'appelle le dataMapper
const dataMapper = require('../dataMapper.js');

//On créé un deckController pour gérer le middlemware qui permettra d'ajouter les cartes au deck.
const deckController = {

    async displayDeck(req, res) {
        try {
            const cards = req.session.deck || [];

            res.render('deck', {
                cards,
                title: "Mon Deck"
            });

        } catch (error) {
            console.error(error);
            res.status(500).send('Il ya une erreur dans le deckController/displayDeck');
        }
    },

    async addCard(req, res) {
        try {
            const cardId = req.params.id;
            const card = await dataMapper.getCard(cardId);

            if (!req.session.deck) {req.session.deck = []};

            let deck = req.session.deck;

            const found = req.session.deck.find(card => card.id === parseInt(cardId, 10));

            if (deck.length < 5 && !found) {
                deck.push(card);
            } 

            res.redirect('/deck');

        } catch (error) {
            console.error(error);
            res.status(500).send('Il ya une erreur dans le deckController/addCard');
        }
    },

    async deleteCard(req, res) {
        try {
            const cards = req.session.deck || [];
            const cardId = parseInt(req.params.id);
            const deleteCard = cards.filter((element) =>{
            return element.id !== cardId
            });
            req.session.deck = deleteCard;
            res.redirect('/deck');
        } catch (error) {
            console.error(error);
            res.status(500).send('Il ya une erreur dans le deckController/deleteCard');
        }
    }
};

module.exports = deckController;