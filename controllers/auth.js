const bcrypt = require('bcrypt');
const { User } = require('../models');
const yup = require('yup');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    console.log('User', req.body);

    const { firstName, lastName, email, password } = req.body;
    const user1 = await User.findOne({
      where: {
        email,
      },
    });
    if (user1) {
      return res.status(400).json({ message: ' Email already exist !' });
    }

    //password hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    const userSchema = yup.object().shape({
      firstName: yup
        .string()
        .matches(/^[a-zA-Z]+$/, 'Must be only letters')
        .min(2, 'firstName too short!')
        .max(50, 'firstName too long!')
        .required('Required'),
      lastName: yup
        .string()
        .matches(/^[a-zA-Z]+$/, 'Must be only letters')
        .min(2, 'lastName too short!')
        .max(50, 'lastName too long!')
        .required('Required'),
      email: yup.string().email('Invalid email').required('Required'),
      password: yup
        .string()
        .min(2, 'password too short!')
        .max(50, 'password too long!')
        .required('Required'),
    });

    await userSchema.validate({ firstName, lastName, email, password });

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ ...user.dataValues }, 'shhhhh', {
      expiresIn: '2h',
    });
    return res.status(201).json({
      message: 'User successfully created !',
      user,
      token: token,
    });
  } catch (err) {
    console.log(err.stack);
    return res.status(500).json({ type: err.name, message: err.message });
  }
};

const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(400).json({ message: ' User not found!' });
    } else {
      const hashedPassword = user.password;
      const validPassword = await bcrypt.compare(password, hashedPassword);
      if (!validPassword) {
        return res.status(400).json({ message: 'password is wrong!' });
      }
      // generateAccessToken
      const token = jwt.sign({ ...user.dataValues }, 'shhhhh', {
        expiresIn: '2h',
      });
      return res.json({
        user,
        token: token,
      });
    }
  } catch (err) {
    return res.status(500).json({ message: 'error...' });
  }
};

module.exports = {
  register,
  logIn,
};
