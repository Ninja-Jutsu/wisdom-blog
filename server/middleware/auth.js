const jwt = require('jsonwebtoken')
const User = require('../models/user')
require('dotenv').config()
const debug = require('debug')('AUTH')
const logger = require('../startup/logging')

function requireAuth(req, res, next) {
  const token = req.cookies.jwt // we can only use this because of the cookie parser pack
  // if it exists
  if (token) {
    jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
      if (err) {
        res.json({ loginPage: './loginXX' })
      } else {
        next()
      }
    })
  } else {
    logger.warn('requireAuth: Token not found')
    res.json({ loginPage: './loginYY' })
  }
}

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt
  // console.log('checkUser' + req.body)
  if (token) {
    jwt.verify(token, process.env.SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null
        next()
      } else {
        let user = await User.findById(decodedToken.id)
        res.locals.user = user
        next()
      }
    })
  } else {
    logger.warn('checkUser: Token not found')
    res.locals.user = null
    next()
  }
}

const maxAge = 3 * 24 * 60 * 60 // 3 days in seconds

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, { expiresIn: maxAge }) // 1st arg is the payload , 2nd is secret, 3rd is valid for how long?
}

const handleErrors = (err) => {
  const errors = {}
  if (err === 'incorrect email' || err === 'incorrect password') {
    errors.loginErr = err.message
  }

  return errors
}
module.exports = { requireAuth, checkUser, createToken, handleErrors, maxAge }
