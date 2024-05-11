const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')

// Very important in order to access your cookies on Frontend
const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your frontend origin
  exposedHeaders: ['set-cookie'],
  credentials: true, // Allow requests with credentials
  allowedHeaders: ['Content-Type', 'Authorization'], // Optional, specify allowed headers
  methods: 'GET, POST, PUT , DELETE', // Optional, specify allowed HTTP methods
}

// routes:
const { requireAuth, checkUser } = require('../middleware/auth')
const postRouter = require('../routes/posts')
const homeRouter = require('../routes/home')
const userRouter = require('../routes/users')
const commentRouter = require('../routes/comments')
const authRouter = require('../routes/auth')

// Use in index.js
module.exports = function (app) {
  //Middleware
  app.use(express.json())
  app.use(cookieParser())
  app.use(cors(corsOptions))

  //Routes
  app.use('*', checkUser) // check for every route if the user is logged in
  app.use('/api/', homeRouter)
  app.use('/api/auth', authRouter)
  app.use('/api/posts', postRouter)
  app.use('*', requireAuth)
  app.use('/api/users', userRouter)
  app.use('/api/comments', commentRouter)
}
