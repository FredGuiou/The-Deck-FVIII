const database = require('./database');

const dataMapper = {

  getAllCards: function (callback) {
    const query = {
      text: `SELECT * FROM "card"`
    };
    database.query(query, callback);
  },

  getCard: async (id) => {
    const card = await database.query(`SELECT * FROM "card" WHERE "id" = ${id}`);

    return card.rows[0];
  },

  getCardsByElements: async (element) => {
    if (element === 'null') {
      const search = await database.query(`SELECT * FROM "card" WHERE "element" IS NULL`);
      return search.rows;
    } else {
      const search = await database.query(`SELECT * FROM "card" WHERE "element"=$1`, values=[element]);
      return search.rows;
    };
  }

};


module.exports = dataMapper;