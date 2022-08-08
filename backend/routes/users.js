/** @format */
const express = require('express');
const router = express.Router();

const usersCtrl = require('../controllers/users');
const authCheck = require('../middleware/auth-check.js');

router.get('/', authCheck, usersCtrl.getAllUsers);

module.exports = router; 