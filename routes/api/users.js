const express = require('express');
const router = express.Router();
// const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const normalize = require('normalize-url');

const validateRegisterForm = require('../../validation/register');
const User = require('../../models/User');

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post('/', async (req, res) => {
	const { errors, isValid } = validateRegisterForm(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { login, email, password } = req.body;

  try {
    let user = await User.findOne({ $or: [{ email }, { login }] });

    if (user) {
      return res
        .status(400)
        .json({
          errors: {
            email: {message: 'User already exists'},
            login: {message: 'User already exists'}
          }
        });
    }

    // const avatar = normalize(
    //   gravatar.url(email, {
    //     s: '200',
    //     r: 'pg',
    //     d: 'mm'
    //   }),
    //   { foceHttps: true }
    // );

    user = new User({
      login,
      email,
      // avatar,
      password,
    });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: '5 days' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Serer error');
  }
});

module.exports = router;
