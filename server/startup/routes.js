const error = require('../middleware/error')
const express = require('express')

// routes:

const users = require('../routes/users')
const posts = require('../routes/posts')
const comments = require('../routes/comments')
const home = require('../routes/home')

// Use in index.js
module.exports = function (app) {
  app.use(express.json())
  app.use('/api/users', users)
  app.use('/api/posts', posts)
  app.use('/api/comments', comments)
  app.use('/', home)
  app.use(error)
}
