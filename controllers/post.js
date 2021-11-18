const { Post, User } = require('../models');

//Create
const createPost = async (req, res) => {
  try {
    const { title, description } = req.body;
    console.log(req.body, req.user.id);
    const post = await Post.create({
      title,
      description,
      userId: req.user.id,
    });
    return res.status(200).json({
      message: ' Post successfully created ! ',
      post,
    });
  } catch (err) {
    console.log(111, err);
    return res.status(500).json({ message: 'can`t create post' });
  }
};

// Get All posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    return res.json({
      posts: posts,
    });
  } catch (err) {
    return res.status(500).json({ message: 'posts and users not found!' });
  }
};
//Get All users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.json({
      users: users,
    });
  } catch (err) {
    return res.status(500).json({ message: 'posts and users not found!' });
  }
};
//Update
const updatePost = async (req, res) => {
  try {
    await Post.update(
      {
        title: req.body.title,
        description: req.body.description,
      },
      {
        where: { id: req.body.id },
      }
    ).then(() => {
      res.send('user updated');
    });
  } catch (err) {
    return res.status(500).json({ message: 'can`t update post' });
  }
};

//Delete
const deletePost = async (req, res) => {
  try {
    const posts = await Post.destroy({ where: { id: req.params.id } });
    res.status(200).json({ posts });
  } catch (err) {
    return res.status(500).json({ message: 'can`t delete post' });
  }
};

const getUserPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      where: {
        userId: req.user.id,
      },
    });
    console.log('posts', posts);
    res.json({ posts });
  } catch (e) {
    return res.status(500).json({ message: 'posts not found!' });
  }
};

module.exports = {
  getAllPosts,
  getAllUsers,
  createPost,
  updatePost,
  deletePost,
  getUserPosts,
};
