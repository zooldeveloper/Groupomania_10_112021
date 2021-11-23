const express = require('express');
const router = express.Router();

const likeCtrl = require('../controllers/like');

router.post('/', likeCtrl.createLike);
router.get('/', likeCtrl.getLike); 
router.put('/:id', likeCtrl.updateLike); 
router.delete('/:id', likeCtrl.deleteLike); 

module.exports = router; 