const express = require('express');
const router = express.Router();
const { verifyAuth } = require('../middleware');

const auth = require('../controllers/auth');
const posts = require('../controllers/posts');

router.post('/register', auth.register);
router.post('/login', auth.logIn);
router.get('/my-posts', verifyAuth, posts.getPosts);

module.exports = router;
