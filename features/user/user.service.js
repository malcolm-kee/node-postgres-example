const { query } = require('../../db');

exports.createUser = (user) => {
  return query(
    `INSERT INTO end_users(username, password, email) VALUES ($1, $2, $3)`,
    [user.username, user.password, user.email]
  );
};

exports.getUser = ({ username }) => {
  return query(
    `SELECT username, email, password FROM end_users WHERE username = $1`,
    [username]
  ).then((result) => {
    return result.rows[0];
  });
};
