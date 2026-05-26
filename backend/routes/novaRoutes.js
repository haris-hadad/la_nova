const express = require('express');
const router = express.Router();
const novaController = require('../controllers/novaController');
const verifyToken = require('../middleware/auth');

router.post('/:post_id', verifyToken, novaController.toggle);
router.get('/:post_id', verifyToken, novaController.count);

module.exports = router;