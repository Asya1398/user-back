const express = require('express');
const router = express.Router();

const posts = require('../controllers/post');
const { verifyAuth } = require('../middleware');

router.get('/', verifyAuth, posts.getPosts);
router.post('/create', verifyAuth, posts.createPosts);
router.put('/update', verifyAuth, posts.updatePosts);
router.post('/delete/:id', verifyAuth, posts.deletePosts);

module.exports = router;
