const express = require('express');
const router = express.Router();
const commentaireController = require('../controllers/commentaireController');
const verifyToken = require('../middleware/auth');

router.post('/:post_id', verifyToken, commentaireController.create);
router.get('/:post_id', verifyToken, commentaireController.getByPost);
router.delete('/:id', verifyToken, commentaireController.delete);

module.exports = router;