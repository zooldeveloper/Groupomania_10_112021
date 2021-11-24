const express = require('express');
const router = express.Router();

const likeCtrl = require('../controllers/like');

router.post('/', likeCtrl.createAndUpdateLikes);
router.get('/', likeCtrl.getLikesAndDislikes); 

module.exports = router; 