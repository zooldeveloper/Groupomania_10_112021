const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/comment');

router.post('/', commentCtrl.createComment);
router.get('/', commentCtrl.getComment);
router.put('/:id', commentCtrl.updateComment);
router.delete('/:id', commentCtrl.deleteComment);


module.exports = router;