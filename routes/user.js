const express = require('express');
const router = express.Router();

const { auth } = require('../controllers');

router.post('/register', auth.register);
router.post('/login', auth.logIn);

module.exports = router;
