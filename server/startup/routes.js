const error = require('../middleware/error')
const express = require('express')
const cookieParser = require('cookie-parser')


// const error = require('../middleware/error')
// routes:
const { requireAuth, checkUser } = require('../middleware/auth')
const postRouter = require('../routes/posts')
const homeRouter = require('../routes/home')
const userRouter = require('../routes/users')
const commentRouter = require('../routes/comments')
const authRouter = require('../routes/auth')

// Use in index.js
module.exports = function (app) {
  app.use(express.json())
  app.use(cookieParser())
  app.use('*', checkUser) // check for every route if the user is logged in
  app.use('/api/', homeRouter)
  app.use('/api/auth', authRouter)
  app.use('*', requireAuth)
  app.use('/api/posts', postRouter)
  app.use('/api/users', userRouter)
  app.use('/api/comments', commentRouter)
}
