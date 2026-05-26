const Post = require('../models/postModel');
const path = require('path');

const postController = {
  create: (req, res) => {
    const { contenu, duree } = req.body;
    const user_id = req.user.id;
    const media = req.file ? req.file.filename : null;

    if (!contenu && !media) {
      return res.status(400).json({ message: 'Contenu ou media obligatoire' });
    }

    const postData = {
      user_id,
      contenu,
      media,
      duree: duree || 24
    };

    Post.create(postData, (err, result) => {
      if (err) return res.status(500).json({ message: 'Erreur serveur' });
      res.status(201).json({ message: 'Post créé avec succès ✅', id: result.insertId });
    });
  },

  getAll: (req, res) => {
    Post.getAll((err, results) => {
      if (err) return res.status(500).json({ message: 'Erreur serveur' });
      res.status(200).json(results);
    });
  },

  getById: (req, res) => {
    const { id } = req.params;
    Post.getById(id, (err, results) => {
      if (err) return res.status(500).json({ message: 'Erreur serveur' });
      if (results.length === 0) return res.status(404).json({ message: 'Post introuvable' });
      res.status(200).json(results[0]);
    });
  },

  delete: (req, res) => {
    const { id } = req.params;
    const user_id = req.user.id;
    Post.delete(id, user_id, (err, result) => {
      if (err) return res.status(500).json({ message: 'Erreur serveur' });
      if (result.affectedRows === 0) return res.status(404).json({ message: 'Post introuvable ou non autorisé' });
      res.status(200).json({ message: 'Post supprimé ✅' });
    });
  }
};

module.exports = postController;