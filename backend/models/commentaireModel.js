const db = require('../config/db');

const Commentaire = {
  create: (data, callback) => {
    const sql = `INSERT INTO commentaires (user_id, post_id, contenu) 
                 VALUES (?, ?, ?)`;
    db.query(sql, [data.user_id, data.post_id, data.contenu], callback);
  },

  getByPost: (post_id, callback) => {
    const sql = `SELECT commentaires.*, users.username, users.photo_profil 
                 FROM commentaires 
                 JOIN users ON commentaires.user_id = users.id 
                 WHERE commentaires.post_id = ? 
                 ORDER BY commentaires.created_at ASC`;
    db.query(sql, [post_id], callback);
  },

  delete: (id, user_id, callback) => {
    const sql = `DELETE FROM commentaires WHERE id = ? AND user_id = ?`;
    db.query(sql, [id, user_id], callback);
  }
};

module.exports = Commentaire;