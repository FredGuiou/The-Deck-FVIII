const database = require('./database');

const dataMapper = {

  getAllCards: function (callback) {
    const query = {
      text : `SELECT * FROM "card"`
    };
    database.query(query, callback);
  },
  
  getCard: async (id) => {
    const card = await database.query(`SELECT * FROM "card" WHERE "id" = ${id}`);
    
    return card.rows[0];
  }
  
};


module.exports = dataMapper;