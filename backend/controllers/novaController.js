const Nova = require('../models/novaModel');

const novaController = {
  toggle: (req, res) => {
    const user_id = req.user.id;
    const post_id = req.params.post_id;

    Nova.hasNova(user_id, post_id, (err, results) => {
      if (err) return res.status(500).json({ message: 'Erreur serveur' });

      if (results.length > 0) {
        Nova.remove(user_id, post_id, (err) => {
          if (err) return res.status(500).json({ message: 'Erreur serveur' });
          Nova.count(post_id, (err, count) => {
            if (err) return res.status(500).json({ message: 'Erreur serveur' });
            res.status(200).json({ 
              message: 'Nova retiré ✅', 
              novas: count[0].total,
              hasNova: false
            });
          });
        });
      } else {
        Nova.add(user_id, post_id, (err) => {
          if (err) return res.status(500).json({ message: 'Erreur serveur' });
          Nova.count(post_id, (err, count) => {
            if (err) return res.status(500).json({ message: 'Erreur serveur' });
            res.status(200).json({ 
              message: 'Nova ajouté 💫', 
              novas: count[0].total,
              hasNova: true
            });
          });
        });
      }
    });
  },

  count: (req, res) => {
    const post_id = req.params.post_id;
    Nova.count(post_id, (err, results) => {
      if (err) return res.status(500).json({ message: 'Erreur serveur' });
      res.status(200).json({ novas: results[0].total });
    });
  }
};

module.exports = novaController;