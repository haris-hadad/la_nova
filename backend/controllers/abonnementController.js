const Abonnement = require('../models/abonnementModel');

const abonnementController = {
  toggle: (req, res) => {
    const follower_id = req.user.id;
    const following_id = req.params.user_id;

    if (follower_id == following_id) {
      return res.status(400).json({ message: 'Vous ne pouvez pas vous suivre vous même' });
    }

    Abonnement.isFollowing(follower_id, following_id, (err, results) => {
      if (err) return res.status(500).json({ message: 'Erreur serveur' });

      if (results.length > 0) {
        Abonnement.unfollow(follower_id, following_id, (err) => {
          if (err) return res.status(500).json({ message: 'Erreur serveur' });
          res.status(200).json({ message: 'Désabonné ✅', isFollowing: false });
        });
      } else {
        Abonnement.follow(follower_id, following_id, (err) => {
          if (err) return res.status(500).json({ message: 'Erreur serveur' });
          res.status(200).json({ message: 'Abonné ✅', isFollowing: true });
        });
      }
    });
  },

  getFollowers: (req, res) => {
    const user_id = req.params.user_id;
    Abonnement.getFollowers(user_id, (err, results) => {
      if (err) return res.status(500).json({ message: 'Erreur serveur' });
      res.status(200).json(results);
    });
  },

  getFollowing: (req, res) => {
    const user_id = req.params.user_id;
    Abonnement.getFollowing(user_id, (err, results) => {
      if (err) return res.status(500).json({ message: 'Erreur serveur' });
      res.status(200).json(results);
    });
  }
};

module.exports = abonnementController;