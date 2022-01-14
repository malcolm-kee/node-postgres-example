const { newDb } = require('pg-mem');
const fs = require('fs');
const path = require('path');

const setupSql = fs.readFileSync(
  path.resolve(__dirname, '../sql/setup-db.sql'),
  'utf-8'
);

const { Pool } = newDb({
  noAstCoverageCheck: true,
}).adapters.createPg();

const pool = new Pool();

pool.query(setupSql);

module.exports = {
  query: (text, params) => pool.query(text, params),
};
