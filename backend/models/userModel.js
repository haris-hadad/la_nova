const db = require('../config/db');

const User = {
  create: (userData, callback) => {
    const sql = `INSERT INTO users (username, email, password, date_naissance) 
                 VALUES (?, ?, ?, ?)`;
    db.query(sql, [
      userData.username,
      userData.email,
      userData.password,
      userData.date_naissance
    ], callback);
  },

  findByEmail: (email, callback) => {
    const sql = `SELECT * FROM users WHERE email = ?`;
    db.query(sql, [email], callback);
  },

  findById: (id, callback) => {
    const sql = `SELECT id, username, email, bio, photo_profil, created_at 
                 FROM users WHERE id = ?`;
    db.query(sql, [id], callback);
  }
};

module.exports = User;