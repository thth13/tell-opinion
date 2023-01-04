const express = require('express')
const multer = require("multer")
const util = require('util')
const fs = require('fs')
const unlinkFile = util.promisify(fs.unlink)
const router = express.Router()

const auth = require('../../middleware/auth')
const checkObjectId = require('../../middleware/checkObjectId')
const { PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3')
const s3 = require('../../middleware/s3Client')

const Profile = require('../../models/Profile')
const User = require('../../models/User')
const Opinion = require('../../models/Opinion')

const upload = multer({ dest: 'uploads/' })

const opinionsLimit = 10;

// @route   GET api/profile/me
// @desc    Get current users profile
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate('user', ['login', 'avatar'])

    const opinions = await Opinion.find({
      profile: profile._id
    }).populate('profile', ['text'])
      .sort({date: -1})
      .limit(opinionsLimit)

    const opinionsLength = await Opinion.countDocuments({
      profile: profile._id
    })

    if (!profile) {
      return res.status(400).json({msg: 'There is no profile for this user'})
    }

    res.json({profile, opinions, opinionsLength})

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
      const user = await User.findOne({
        login: username
      })

      if (!user) return res.status(400).json({msg: 'Profile not found'})

      const profile = await Profile.findOne({
        user: user._id
      }).populate('user', ['login', 'avatar'])

      const opinions = await Opinion.find({
        profile: profile._id
      }).populate('profile', ['text'])
        .sort({date: -1})
        .limit(opinionsLimit)

      const opinionsLength = await Opinion.countDocuments({
        profile: profile._id
      })

      if (!profile) return res.status(400).json({msg: 'Profile not found'})
   
      return res.json({profile, opinions, opinionsLength})
    } catch (err) {
      console.error(err.message)
      return res.status(500).json({msg: 'Server error'})
    }
  }
)

// @route   GET api/profile/moreopinions/:username
// @desct   Get more opinions
// @access  Public
router.get('/user/moreopinions/:profileId/:opinionsLength', async (req, res) => {
	const length = Number.parseInt(req.params.opinionsLength)

  try {
    const opinions = await Opinion.find({
      profile: req.params.profileId
    }).sort({date: -1}).skip(length).limit(opinionsLimit)

    res.json(opinions)
  } catch (err) {
    console.log(err.message)
    res.status(500).end('Server error')
  }
})

// @route   POST api/profile/user/opinion/:id
// @desc    New opinion about user
// @acess   Public
router.post('/user/opinion/:id', checkObjectId('id'), async (req, res) => {
  // TODO: Validation
  // TODO: Check 1 day after
  try {
    const opinion = await new Opinion({
      text: req.body.text,
      profile: req.params.id
    }).save();

    res.json(opinion)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

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
    const file = fs.readFileSync(req.file.path)
    // TODO: fix bucket to env
    const params = {
      Bucket: "tell-opinion-image",
      Key: req.file.filename,
      Body: file,
      ACL: "public-read"
    }

    try {
      await s3.send(new PutObjectCommand(params))
      const profile = await Profile.findOne({
        user: req.user.id
      }).select('avatar');

      if (profile.avatar) {
        await s3.send(new DeleteObjectCommand({
          Bucket: "tell-opinion-image",
          Key: profile.avatar
        }));
      }

      profileFields.avatar = params.Key
      await unlinkFile(req.file.path)
    } catch (err) {
      await unlinkFile(req.file.path)
      console.log("Error", err)
    }
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
