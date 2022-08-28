const express = require('express')
const path = require("path");
const router = express.Router()
const fs = require('fs')
const auth = require('../../middleware/auth')
const checkObjectId = require('../../middleware/checkObjectId')
const multer = require("multer")
const util = require('util')

const unlinkFile = util.promisify(fs.unlink)
const { PutObjectCommand, S3Client } = require('@aws-sdk/client-s3');

const Profile = require('../../models/Profile')
const User = require('../../models/User')

// @route   GET api/profile/me
// @desc    Get current users profile
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate('user', ['login', 'avatar'])

    if (!profile) {
      return res.status(400).json({msg: 'There is no profile for this user'})
    }

    res.json(profile)
  } catch (err) {
    console.log(err.message)
    res.status(500).end('Server Error')
  }
})

// @route   GET api/profile/user/:username
// @desct   Get profile by user name
// @access  Public
router.get('/user/:username', async ({params: {username}}, res) => {
    try {
      // TODO: Может можно как-то уменьшить количество запросов?
      const user = await User.findOne({
        login: username
      })

      const profile = await Profile.findOne({
        user: user._id
      }).populate('user', ['login', 'avatar'])

      if (!profile) return res.status(400).json({msg: 'Profile not found'})
   
      return res.json(profile)
    } catch (err) {
      console.error(err.message)
      return res.status(500).json({msg: 'Server error'})
    }
  }
)

// @route   POST api/profile/user/opinion/:id
// @desc    New opinion about user
// @acess   Public
router.post('/user/opinion/:id', checkObjectId('id'), async (req, res) => {
  // TODO: Validation
  // TODO: Check 1 day after
  try {
    const profile = await Profile.findById(req.params.id)

    profile.opinions.unshift({text: req.body.text})

    await profile.save()

    res.json(profile.opinions)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

// const storage = multer.diskStorage({
//   destination: "./public/avatars/",
//   filename: function(req, file, cb){
//      cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
//   }
// });

const upload = multer({ dest: 'uploads/' })

// const upload = multer({ storage: storage })


const s3 = new S3Client({
    endpoint: "https://fra1.digitaloceanspaces.com",
    region: "fra1",
    credentials: {
      accessKeyId: 'DO007C9W2XJFVVNVRYDV',
      secretAccessKey: 'DO00JD2LJXA3J9MJLDM8'
    }
});


// @route   POST api/profile
// @desc    Create or update user profile
// @access  Private
router.post('/', auth, upload.single('avatar'), async (req, res) => {
  const {
    name,
    description,
    instagram,
    facebook,
    twitter,
    youtube
  } = req.body

  const profileFields = {
    user: req.user.id,
    name,
    description,
  }

  if (req.file) {
    const params = {
      Bucket: "tell-opinion-img",
      Key: req.file.filename,
      Body: req.file,
      ACL: "private",
    };
    
    try {console.log(3)
      const data = await s3.send(new PutObjectCommand(params));
      console.log(
        "Successfully uploaded object: " +
          params.Bucket +
          "/" +
          params.Key
      );
      console.log(data);
      await unlinkFile(req.file.path)
    } catch (err) {
      await unlinkFile(req.file.path)
      console.log("Error", err);
    }
    // profileFields.avatar = req.file.filename
  }

  const socialFields = { instagram, facebook, twitter, youtube }

  // for (const [key, value] of Object.entries(socialFields)) {
  //   if (value && value.length > 0)
  //     socialFields[key] = normalize(value, { forceHttps: true })
  // }
  profileFields.social = socialFields

  try {
    let profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: profileFields },
      { new: true, upsert: true, setDefaultOnInsert: true }
    )
    
    return res.json(profile)
  } catch (err) {
    console.error(err.message)
    return res.status(500).send('Server Error')
  }
})

module.exports = router
