const express = require('express');
const router = express.Router();

const likeCtrl = require('../controllers/like');
const authCheck = require('../middleware/auth-check.js');

router.post('/', authCheck,  likeCtrl.createAndUpdateLikes);
router.get('/', authCheck, likeCtrl.getLikesAndDislikes); 

module.exports = router; 