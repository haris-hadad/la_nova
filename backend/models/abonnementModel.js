const db = require('../config/db');

const Abonnement = {
  follow: (follower_id, following_id, callback) => {
    const sql = `INSERT INTO abonnements (follower_id, following_id) 
                 VALUES (?, ?)`;
    db.query(sql, [follower_id, following_id], callback);
  },

  unfollow: (follower_id, following_id, callback) => {
    const sql = `DELETE FROM abonnements WHERE follower_id = ? AND following_id = ?`;
    db.query(sql, [follower_id, following_id], callback);
  },

  isFollowing: (follower_id, following_id, callback) => {
    const sql = `SELECT * FROM abonnements WHERE follower_id = ? AND following_id = ?`;
    db.query(sql, [follower_id, following_id], callback);
  },

  getFollowers: (user_id, callback) => {
    const sql = `SELECT users.id, users.username, users.photo_profil 
                 FROM abonnements 
                 JOIN users ON abonnements.follower_id = users.id 
                 WHERE abonnements.following_id = ?`;
    db.query(sql, [user_id], callback);
  },

  getFollowing: (user_id, callback) => {
    const sql = `SELECT users.id, users.username, users.photo_profil 
                 FROM abonnements 
                 JOIN users ON abonnements.following_id = users.id 
                 WHERE abonnements.follower_id = ?`;
    db.query(sql, [user_id], callback);
  }
};

module.exports = Abonnement;