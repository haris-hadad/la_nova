const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

const db = require('./backend/config/db');
const authRoutes = require('./backend/routes/authRoutes');
const postRoutes = require('./backend/routes/postRoutes');
const novaRoutes = require('./backend/routes/novaRoutes');
const commentaireRoutes = require('./backend/routes/commentaireRoutes');
const abonnementRoutes = require('./backend/routes/abonnementRoutes');

app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/novas', novaRoutes);
app.use('/api/commentaires', commentaireRoutes);
app.use('/api/abonnements', abonnementRoutes);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'frontend')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur Nova démarré sur le port ${PORT}`);
});