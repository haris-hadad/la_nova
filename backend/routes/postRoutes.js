const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const verifyToken = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.post('/', verifyToken, upload.single('media'), postController.create);
router.get('/', verifyToken, postController.getAll);
router.get('/:id', verifyToken, postController.getById);
router.delete('/:id', verifyToken, postController.delete);

module.exports = router;