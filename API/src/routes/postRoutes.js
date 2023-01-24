const express = require('express');
const router = express.Router();
const multer = require('multer') //npm install --save multer
const AUTHENTICATED = require('../middleware/Authenticator');
const postController = require('../controllers/PostController')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/postImages');
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




router.get('/',
    AUTHENTICATED,
    postController.Posts_GET_ReadAll);

router.post('/',
    AUTHENTICATED,
    upload.single('postImage'),
    postController.Posts_POST_Create);

router.get('/:postId',
    AUTHENTICATED,
    postController.Posts_GET_ReadById);

router.patch('/:postId',
    AUTHENTICATED,
    postController.Posts_PATCH_Update);

router.delete('/:postId',
    AUTHENTICATED,
    postController.Posts_DELETE_Delete);


module.exports = router;
