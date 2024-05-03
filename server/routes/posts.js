const express = require('express')
const router = express.Router()
const Post = require('../models/post')
const { model } = require('mongoose')

router.get('/', async (req, res) => {
  const allPosts = await Post.find()
  console.log(allPosts)
  res.status(200).json(allPosts)
})

router.post('/', async (req, res) => {
  const aPost = await Post.create(req.body)
  res.status(200).json(aPost)
})

module.exports = router
