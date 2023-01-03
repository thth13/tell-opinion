const express = require('express');
const router = express.Router();
// const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const validateRegisterForm = require('../../validation/register');
const User = require('../../models/User');
const Profile = require('../../models/Profile');

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

    user = new User({
      login,
      email,
      password
    });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();
    // TODO: Как-то странно. проверить
    profile = new Profile({
      user: user.id
    })

    await profile.save();

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
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
