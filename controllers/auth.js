const bcrypt = require('bcrypt');
const { User } = require('../models');
const yup = require('yup');

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
      throw {
        message: 'Email already exist !',
      };
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
    return res.status(201).json({
      message: 'User successfully created !',
      user,
    });
  } catch (err) {
    console.log(err.stack);
    return res.status(500).json({ type: err.name, message: err.message });
  }
};

module.exports = {
  register,
};
//log in
const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      console.log('Not found!');
      return res.status(400).json({ message: 'Not found!' });
    } else {
      const hashedPassword = user.password;
      const x = await bcrypt.compare(password, hashedPassword);
      console.log('x', x);
      return res.status(200).json();
    }
  } catch (err) {
    return res.status(500).json({ message: 'error...' });
  }
};

module.exports = {
  register,
  logIn,
};
