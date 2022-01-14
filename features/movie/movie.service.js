const { query } = require('../../db');

exports.getMovies = () =>
  query(`SELECT * FROM movies;`).then((res) => res.rows);

exports.getMovie = (id) =>
  query(`SELECT * FROM movies WHERE id = $1`, [id]).then((res) => res.rows[0]);
