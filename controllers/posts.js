const { Post } = require('../models');
const getPosts = async (req, res) => {
  try {
    console.log('req user', req.user);
    const posts = await Post.findAll({
      where: {
        userId: req.user.id,
      },
    });
    if (posts) {
      return res.json({
        posts,
      });
    }
  } catch (err) {
    return res.status(500).json({ message: 'error...' });
  }
};

module.exports = {
  getPosts,
};
