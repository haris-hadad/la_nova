const db = require('../config/db');

const Nova = {
  add: (user_id, post_id, callback) => {
    const sql = `INSERT INTO novas (user_id, post_id) VALUES (?, ?)`;
    db.query(sql, [user_id, post_id], callback);
  },

  remove: (user_id, post_id, callback) => {
    const sql = `DELETE FROM novas WHERE user_id = ? AND post_id = ?`;
    db.query(sql, [user_id, post_id], callback);
  },

  count: (post_id, callback) => {
    const sql = `SELECT COUNT(*) as total FROM novas WHERE post_id = ?`;
    db.query(sql, [post_id], callback);
  },

  hasNova: (user_id, post_id, callback) => {
    const sql = `SELECT * FROM novas WHERE user_id = ? AND post_id = ?`;
    db.query(sql, [user_id, post_id], callback);
  }
};

module.exports = Nova;