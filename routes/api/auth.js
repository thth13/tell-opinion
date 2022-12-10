const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const crypto = require('crypto');
const sendEmail = require('../../config/emailSender');

const validateLoginForm = require('../../validation/login');
const User = require('../../models/User');

// @route POST api/auth/recover
// @desct Recover password - Generates token and Sends password reset email
// @acess Public
router.post('/recover', async (req, res) => {
  try {
    const user = await User.findOne({email: req.body.email})

    if (!user) return res.status(401).json({
      errors: {
        email: {
          message: `The email address ${req.body.email} is not associated with any account. Double-check your email address and try again.`
        }
      }
    });

    // Generate and set password reset token
    user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordExpires = Date.now() + 3600000; //expires in an hou

    user.save()
      .then(user => {
          let link = "http://" + req.headers.host + "/resetpassword/" + user.resetPasswordToken;

          sendEmail(
            'Restore password',
            `Hi ${user.login} \n 
              Please click on the following link ${link} to reset your password. \n\n 
              If you did not request this, please ignore this email and your password will remain unchanged.\n`,
            user.email
          )

          // const mailOptions = {
          //     to: user.email,
          //     from: process.env.FROM_EMAIL,
          //     subject: "Password change request",
          //     text: `Hi ${user.username} \n 
          // Please click on the following link ${link} to reset your password. \n\n 
          // If you did not request this, please ignore this email and your password will remain unchanged.\n`,
          // };
          res.status(200).json({message: 'A reset email has been sent to ' + user.email + '.'});
      })
      .catch(err => res.status(500).json({message: err.message}));


  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route POST api/auth/reset
// @desc Reset Password
// @access Public
router.post('/reset/:token', async (req, res) => {
  try {
    let user = await User.findOne({resetPasswordToken: req.params.token, resetPasswordExpires: {$gt: Date.now()}})

    if (!user) return res.status(401).json({
      errors: {
        password: {
          message: 'Password reset token is invalid or has expired, try restore password again'
        }
      }
    });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(req.body.password, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();
    
    res.json('Password changed successfully')
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error')
  }
});

// @route   GET api/auth
// @desc    Get user by token
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.put('/changepassword', auth, async (req, res) => {
  const {oldPassword, newPassword} = req.body
  try {
    const user = await User.findById(req.user.id)

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({
          errors: {
            oldPassword: {message: 'Wrong old password'},
          }
        });
    }

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    res.json('Password changed successfully')
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Public
router.post('/', async (req, res) => {
	const { errors, isValid } = validateLoginForm(req.body);

  if (!isValid) {
  	return res.status(400).json(errors);
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({
          errors: {
            email: {message: 'Invalid Credentials'},
            password: {message: 'Invalid Credentials'}
          }
        });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({
          errors: {
            email: {message: 'Invalid Credentials'},
            password: {message: 'Invalid Credentials'}
          }
        });
    }

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
    res.status(500).send('Server error');
  }
});

module.exports = router;
