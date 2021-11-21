const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const multer = require('../middleware/multer-config');
const upload = multer.single('profile_image');

router.post('/:id', upload, userCtrl.addDataToUserProfile);
router.patch('/:id', upload, userCtrl.modifiyOneUser);
router.get('/:id', userCtrl.getOneUser);
router.delete('/:id', userCtrl.deleteOneUser);

module.exports = router;