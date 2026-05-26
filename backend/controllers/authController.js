const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authController = {
  inscription: (req, res) => {
    const { username, email, password, date_naissance } = req.body;

    if (!username || !email || !password || !date_naissance) {
      return res.status(400).json({ message: 'Tous les champs sont obligatoires' });
    }

    User.findByEmail(email, (err, results) => {
      if (err) return res.status(500).json({ message: 'Erreur serveur' });
      if (results.length > 0) return res.status(400).json({ message: 'Email déjà utilisé' });

      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return res.status(500).json({ message: 'Erreur serveur' });

        const userData = { username, email, password: hashedPassword, date_naissance };

        User.create(userData, (err, result) => {
          if (err) return res.status(500).json({ message: 'Erreur serveur' });
          res.status(201).json({ message: 'Compte créé avec succès ✅' });
        });
      });
    });
  },

  connexion: (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email et mot de passe obligatoires' });
    }

    User.findByEmail(email, (err, results) => {
      if (err) return res.status(500).json({ message: 'Erreur serveur' });
      if (results.length === 0) return res.status(401).json({ message: 'Email ou mot de passe incorrect' });

      const user = results[0];

      bcrypt.compare(password, user.password, (err, match) => {
        if (err) return res.status(500).json({ message: 'Erreur serveur' });
        if (!match) return res.status(401).json({ message: 'Email ou mot de passe incorrect' });

        const token = jwt.sign(
          { id: user.id, username: user.username },
          process.env.JWT_SECRET,
          { expiresIn: '7d' }
        );

        res.status(200).json({
          message: 'Connexion réussie ✅',
          token,
          user: {
            id: user.id,
            username: user.username,
            email: user.email
          }
        });
      });
    });
  }
};

module.exports = authController;