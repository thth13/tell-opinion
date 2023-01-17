const express = require('express');
const router = express.Router();
// const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const validateRegisterForm = require('../../validation/register');
const User = require('../../models/User');
const Profile = require('../../models/Profile');

// @route   GET api/users/find/:username/:userslength
// @desc    Find users
// @access  Public
router.get('/find/:username/:userslength', async ({params: {username, userslength}}, res) => {
  const length = Number.parseInt(userslength)

  try {
    let userList;

    if (username !== 'undefined') {
      userList = await Profile.find({
        login: { $regex: username, $options: "i" }
      }).skip(length).limit(10);
    } else {
      userList = await Profile.find().skip(length).limit(10);
    }

    return res.json(userList);
  } catch (err) {
    console.error(err.message)
    return res.status(500).json({msg: 'Server error'})
  }
});

// @route   GET api/users/find/:username/:userslength
// @desc    Get more users
// @access  Public
// router.get('/find/:username/:userslength', async ({params: {username, userslength}}, res) => {
//   const length = Number.parseInt(userslength)

//   try {
//     let userList

//     if (username !== 'undefined') {
//       userList = await Profile.find({
//         login: { $regex: username, $options: "i" }
//       }).skip(length).limit(1);
//     } else {
//       userList = await Profile.find().skip(length).limit(1);
//     }
//     console.log(userList)
//     return res.json(userList);
//   } catch (err) {
//     console.log(err.message)
//     return res.status(500).json({msg: 'Server error'})
//   }
// });

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
    const profile = new Profile({
      user: user.id,
      login: user.login
    })

    await profile.save();

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
