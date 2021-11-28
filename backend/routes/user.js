const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const multer = require('../middleware/multer-config');
const upload = multer.single('profile_image');
const authCheck = require('../middleware/auth-check');

router.post('/:id', authCheck, upload, userCtrl.addDataToUserProfile);
router.patch('/:id', authCheck, upload, userCtrl.modifiyOneUser);
router.get('/:id', authCheck, userCtrl.getOneUser);
router.delete('/:id', authCheck, userCtrl.deleteOneUser);

module.exports = router; 