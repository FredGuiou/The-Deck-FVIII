//J'importe dotenv et express et je lance la config des variables d'environnement.
const dotenv = require('dotenv');
const express = require('express');
dotenv.config();

//Je créé le port d'écoute.
const PORT = process.env.PORT || 1234;

//J'importe express-session pour gérer les sessions avant l'import du routeur
const session = require('express-session');

//J'importe le routeur
const router = require('./app/router');

//Je lance express
const app = express();

//J'applique le moteur de rendu des views et je donne le chemin où elles seront stockées.
app.set('view engine', 'ejs');
app.set('views', 'app/views');

//Je fixe les fichiers statics pour la mise en forme css et les images.
app.use(express.static('public'));

//Je lance les sessions avant de lancer le routeur pour qu'elles fonctionnent.
app.use(session({secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true}));

//On crée la caleur par défaut du deck à vide.
app.use((req, res, next) => {if (!req.session.deck) {req.session.deck = []}next();});

//Je lance le routeur.
app.use(router);

//Je lance l'écoute du port définit dans le .env en variable d'environnement.
app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
