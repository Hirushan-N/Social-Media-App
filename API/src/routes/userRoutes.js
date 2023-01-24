const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const AUTHENTICATED = require('../middleware/Authenticator');
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/profileImages');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // Max size 5MB
    },
    fileFilter: fileFilter
});



router.post(
    '/signup',
    upload.single('profileImage'),
    userController.Users_POST_SignUp);

router.post(
    '/login',
    userController.Users_POST_Login);

router.get('/:userId',
    AUTHENTICATED,
    userController.Users_GET_ReadById);

router.delete(
    '/:userId',
    AUTHENTICATED,
    userController.Users_DELETE_Delete);

module.exports = router;