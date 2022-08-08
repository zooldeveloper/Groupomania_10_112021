const express = require('express');
const router = express.Router();

const subscribeCtrl = require('../controllers/subscribe');
const authCheck = require('../middleware/auth-check.js');

router.post('/', authCheck, subscribeCtrl.createAndUpdateSubscribers);
router.get('/', authCheck, subscribeCtrl.getAllSubscribers); 

module.exports = router; 