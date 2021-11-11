const jwt = require('jsonwebtoken');

const verifyAuth = (req, res, next) => {
  try {
    const token = req.get('authorization').split(' ')[1];
    const decoded = jwt.verify(token, 'shhhhh');
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ message: 'User unauthorized' });
  }
};

module.exports = {
  verifyAuth,
};
