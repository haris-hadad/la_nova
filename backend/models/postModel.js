const db = require('../config/db');

const Post = {
  create: (postData, callback) => {
    const sql = `INSERT INTO posts (user_id, contenu, media, expire_at) 
                 VALUES (?, ?, ?, DATE_ADD(NOW(), INTERVAL ? HOUR))`;
    db.query(sql, [
      postData.user_id,
      postData.contenu,
      postData.media,
      postData.duree
    ], callback);
  },

  getAll: (callback) => {
    const sql = `SELECT posts.*, users.username, users.photo_profil 
                 FROM posts 
                 JOIN users ON posts.user_id = users.id 
                 WHERE posts.expire_at > NOW() 
                 ORDER BY posts.created_at DESC`;
    db.query(sql, callback);
  },

  getById: (id, callback) => {
    const sql = `SELECT posts.*, users.username, users.photo_profil 
                 FROM posts 
                 JOIN users ON posts.user_id = users.id 
                 WHERE posts.id = ?`;
    db.query(sql, [id], callback);
  },

  delete: (id, user_id, callback) => {
    const sql = `DELETE FROM posts WHERE id = ? AND user_id = ?`;
    db.query(sql, [id, user_id], callback);
  }
};

module.exports = Post;