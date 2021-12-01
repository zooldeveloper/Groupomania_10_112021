const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');
const multer = require('../middleware/multer-config');
const upload = multer.single('post_image');
const authCheck = require('../middleware/auth-check.js');

router.post('/:id', authCheck, upload, postCtrl.creatPost);
router.get('/', postCtrl.getAllPosts);
router.patch('/:id', authCheck, upload, postCtrl.modifiyPost);
router.delete('/:id', authCheck, upload, postCtrl.deletePost);

module.exports = router;  