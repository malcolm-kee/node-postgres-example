const { query } = require('../../db');

exports.createUser = (user) => {
  return query(
    `INSERT INTO end_users(username, password, email) VALUES ($1, $2, $3)`,
    [user.username, user.password, user.email]
  );
};

exports.getUser = ({ username, password }) => {
  return query(
    `SELECT username, email FROM end_users WHERE username = $1 AND password = $2`,
    [username, password]
  ).then((result) => {
    return result.rows[0];
  });
};
