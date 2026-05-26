const Commentaire = require('../models/commentaireModel');

const commentaireController = {
  create: (req, res) => {
    const { contenu } = req.body;
    const user_id = req.user.id;
    const post_id = req.params.post_id;

    if (!contenu) {
      return res.status(400).json({ message: 'Le contenu est obligatoire' });
    }

    const data = { user_id, post_id, contenu };

    Commentaire.create(data, (err, result) => {
      if (err) return res.status(500).json({ message: 'Erreur serveur' });
      res.status(201).json({ message: 'Commentaire ajouté ✅', id: result.insertId });
    });
  },

  getByPost: (req, res) => {
    const post_id = req.params.post_id;
    Commentaire.getByPost(post_id, (err, results) => {
      if (err) return res.status(500).json({ message: 'Erreur serveur' });
      res.status(200).json(results);
    });
  },

  delete: (req, res) => {
    const { id } = req.params;
    const user_id = req.user.id;
    Commentaire.delete(id, user_id, (err, result) => {
      if (err) return res.status(500).json({ message: 'Erreur serveur' });
      if (result.affectedRows === 0) return res.status(404).json({ message: 'Commentaire introuvable ou non autorisé' });
      res.status(200).json({ message: 'Commentaire supprimé ✅' });
    });
  }
};

module.exports = commentaireController;