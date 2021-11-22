const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');
const multer = require('../middleware/multer-config');
const upload = multer.single('post_image');

router.post('/:id', upload, postCtrl.creatPost);
router.get('/', postCtrl.getAllPosts);
router.patch('/:id', upload, postCtrl.modifiyPost);

module.exports = router;  