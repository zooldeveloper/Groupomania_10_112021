const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/comment');
const authCheck = require('../middleware/auth-check.js');

router.post('/', authCheck, commentCtrl.createComment);
router.get('/', authCheck, commentCtrl.getComment);
router.put('/:id', authCheck, commentCtrl.updateComment);
router.delete('/:id', authCheck, commentCtrl.deleteComment);


module.exports = router;