    //On met en place une methode addCard avec le async/await et try/catch comme sur les autres controllers.
    addCard: async function (req, res) {
        //Je récupère l'id de la carte.
        const cardId = req.params.id;
        //J'utilise la méthode find pour vérifier si la carte est déjà stockée. L'id étant un string on converti en nombre avec ParseInt.
        const found = req.session.deck.find(card => card.id === parseInt(cardId, 10));
        //Si on trouve found alors on renvoi vers la vue du deck.
        if (found) {
            res.redirect('/deck');
            //Sinon la carte n'a pas été ajoutée et on va vérifier si il n'y en a pas déjà 5 (nombre max de cartes du deck dans l'énoncé).
        } else {
            //Si le nombre de cartes est inférieur à 5 alors on ajoute la carte.
            if (req.session.deck.length < 5) {
                try {
                    //On commence par interroger la BDD sur l'id de la carte.
                    const card = await dataMapper.getCard(cardId);
                    if (card) {
                        //J'ajoute la carte et je renvoi vers le deck.
                        req.session.deck.push(card);
                        res.redirect('/deck');
                    } else {
                        //Sinon j'ai une erreur 404 (on pourrait créer une vue spécifique), on informe l'utilisateur.
                        res.status(404).send(`Card with id ${cardId} not found`);
                    }
                } catch (error) {
                    console.error(error);
                    res.status(500).send('Il ya une erreur dans le deckController/addCard');
                }
            } else {
                res.redirect('/deck');
            }
        }
    }