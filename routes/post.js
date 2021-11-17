const express = require('express');
const router = express.Router();

const posts = require('../controllers/post');
const { verifyAuth } = require('../middleware');

router.get('/posts', posts.getPosts);
router.get('/user-posts', verifyAuth, posts.getUserPosts);
router.post('/create', verifyAuth, posts.createPost);
router.put('/update', verifyAuth, posts.updatePost);
router.post('/delete/:id', verifyAuth, posts.deletePosts);

module.exports = router;
