const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DB_CONNECTION_STRING,
});

module.exports = {
  query: (text, params) => {
    return pool.query(text, params);
  },
};
