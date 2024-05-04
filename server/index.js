const express = require('express')
require('express-async-errors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const postRouter = require('./routes/posts')
const homeRouter = require('./routes/home')
const userRouter = require('./routes/users')
const commentRouter = require('./routes/comments')

const app = express()

// middleware
app.use(express.json())
app.use(express.static('public'))
app.use(cookieParser())

// routes
app.use('/api/', homeRouter)
app.use('/api/posts', postRouter)
app.use('/api/users', userRouter)
app.use('/api/comments', commentRouter)

// Connect :
const DB_URL = process.env.DB_URL
mongoose
  .connect(DB_URL)
  .then(() => console.log('Connected to MongoDB..'))
  .catch((err) => console.log(err))

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server is listening on port: ${port}`))
