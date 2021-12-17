const express = require('express');
const router = express.Router();

const posts = require('../controllers/post');
const { verifyAuth } = require('../middleware');

router.get('/posts', posts.getAllPosts);
router.get('/users', posts.getAllUsers);
router.get('/user-posts', verifyAuth, posts.getUserPosts);
router.post('/create', verifyAuth, posts.createPost);
router.get('/:id', verifyAuth, posts.getPost);
router.put('/update-post/:id', verifyAuth, posts.updatePost);
router.delete('/delete/:id', verifyAuth, posts.deletePost);

module.exports = router;
