const database = require('./database');

const dataMapper = {

  getAllCards: function (callback) {
    const query = {
      text: `SELECT * FROM "card"`
    };
    database.query(query, callback);
  },

  getCard: async (id) => {
    //On fait la demande à la BDD de récupérer les données de la carte dont l'id est demandé.
    const card = await database.query(`SELECT * FROM "card" WHERE "id" = ${id}`);
    //On renvoit le résultat.
    return card.rows[0];
  },

  getCardsByElements: async (element) => {
    //On demande à la case de donnée de fournir les cartes correspondant à l'élément choisi.
    if (element === 'null') {
      //Si la carte n'a pas d'élément alors on renvoit le résultat vide. (null a un sens ici)
      const search = await database.query(`SELECT * FROM "card" WHERE "element" IS NULL`);
      return search.rows;
    } else {
      //Sinon onrenvoit les données correspondant à l'élément choisi.
      const search = await database.query(`SELECT * FROM "card" WHERE "element"=$1`, values=[element]);
      return search.rows;
    };
  }

};


module.exports = dataMapper;