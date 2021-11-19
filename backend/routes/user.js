const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const multer = require('../middleware/multer-config');

router.post('/:id', multer, userCtrl.addDataToUserProfile);
router.get('/:id', userCtrl.getOneUser);
router.patch('/:id', multer, userCtrl.modifiyOneUser);

module.exports = router;