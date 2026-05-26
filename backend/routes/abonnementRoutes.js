const express = require('express');
const router = express.Router();
const abonnementController = require('../controllers/abonnementController');
const verifyToken = require('../middleware/auth');

router.post('/:user_id', verifyToken, abonnementController.toggle);
router.get('/:user_id/followers', verifyToken, abonnementController.getFollowers);
router.get('/:user_id/following', verifyToken, abonnementController.getFollowing);

module.exports = router;