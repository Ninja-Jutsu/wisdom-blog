const User = require('../models/user')
const { body, validationResult } = require('express-validator')
require('dotenv').config()
const { createToken, maxAge } = require('../middleware/auth')
const jwt = require('jsonwebtoken')

//> Current user
module.exports.get_currentUser = (req, res) => {
  const token = req.cookies.jwt
  if (token) {
    jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
      if (err) {
        console.log('not verified')
        res.json({ loginPage: './login' })
      } else {
        console.log('verified')
        User.findById(decodedToken.id)
          .then((user) => {
            res.json({ user })
          })
          .catch((err) => {
            console.log(err)
          })
      }
    })
  } else {
    logger.warn('requireAuth: Token not found')
    res.json({ loginPage: './login' })
  }
}
//> Login GET
module.exports.login_get = (req, res) => {
  const token = req.cookies.jwt
  if (token) {
    res.json({ errMessage: 'you already have an account' })
    return
  }
  res.json({ link: '/login' })
}
//> Login POST
module.exports.login_post = async (req, res) => {
  const { email, password } = req.body
  const user = await User.login(email, password)
  if (typeof user !== 'string') {
    const token = createToken(user._id)
    res.cookie('jwt', token, { maxAge: maxAge * 1000, httpOnly: true })

    res.status(200).json({ user, token: token })
  } else {
    if (user === 'incorrect email' || user === 'incorrect password') {
      res.status(400).json({ err: user })
    }
  }
}

//> Logout
module.exports.logout_get = async (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 })
  res.json({ link: '/home' })
}

module.exports.signup_get = (req, res) => {
  const token = req.cookies.jwt
  if (token) {
    res.json({ errMessage: 'you already have an account' })
    return
  }
  res.json({ link: '/signup' })
}

//>Sign up POST
module.exports.signup_post = [
  // Validate and sanitize fields.
  body('username').trim().isLength({ min: 5 }).withMessage('username must be at least 5 characters long').escape(),
  body('email', 'Invalid email').trim().isLength({ min: 1 }).isEmail(),
  body('password', 'Invalid password').trim().notEmpty(),

  // Process request after validation and sanitization.
  async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req)

    // Create User object with escaped and trimmed data
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    })
    const emailUsed = await User.findOne({ email: user.email })
    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.json({
        title: 'Create User',
        user,
        errors: errors.array(),
      })
      return
    } else {
      // Data from form is valid.
      if (emailUsed === null) {
        // Save user.
        // once the user is created we should create a jwt
        try {
          await user.save()
          const token = createToken(user._id) // create the token
          res.cookie('jwt', token, { httpOnly: true })
        } catch (err) {
          console.log(err.errors)
        }
        res.json({ user })
        // Redirect to new user record.
      } else {
        res.status(400).json({ err: 'Email Already Registered' })
      }
    }
  },
]
