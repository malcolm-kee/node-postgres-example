const { query } = require('../../db');

exports.getProducts = () => {
  return query(`SELECT * FROM products;`).then((res) => res.rows);
};

exports.getProduct = (id) => {
  return query(`SELECT * FROM products WHERE id = $1`, [id]).then(
    (res) => res.rows[0]
  );
};
