const debug = require('debug')('post')
const { body, validationResult } = require('express-validator')
const Post = require('../models/post')
const Comment = require('../models/comment')
const user = require('../models/user')
const mongoose = require('mongoose')

//> Display list of all Posts.
exports.post_list = async (req, res) => {
  const AllPosts = await Post.find().sort({ createdOn: -1 }).populate('user').exec()
  res.status(200).json({
    title: 'Posts Feed',
    posts_list: AllPosts,
  })
}

//> Display detail page for a specific Post.
exports.post_detail = async (req, res, next) => {
  const [post, allCommentsByPost] = await Promise.all([
    Post.findById(req.params.id).exec(),
    Comment.find({ post: req.params.id }).populate('user').exec(),
  ])
  if (post === null) {
    const err = new Error('no such post')
    res.status(404)
    return next(err)
  }
  res.status(200).json({
    title: 'Post Details',
    post,
    post_comments: allCommentsByPost,
  })
}

//> Display Post create form on GET.
exports.post_create_get = (req, res, next) => {
  res.status(200).json({ title: 'Create post' })
}

//> Post Create.
exports.post_create_post = [
  // Validate and sanitize fields.
  body('title').trim().isLength({ min: 3 }).withMessage('Title must 3 at least characters long').escape(),
  body('desc').trim().isLength({ min: 1 }).withMessage('Post content must not be empty.'),

  // Process request after validation and sanitization.
  async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req)

    // Create Post object with escaped and trimmed data
    const post = new Post({
      title: req.body.title.replace(/&#x27;/g, "'"),
      desc: req.body.desc.replace(/&#x27;/g, "'"),
      user: req.body.user.replace(/&#x27;/g, "'"),
    })
    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.json({
        title: 'Create post',
        post,
        errors: errors.array(),
      })
      return
    } else {
      // Data from form is valid.

      // Save post.
      await post.save()
      // Redirect to new post record.
      res.json({ postUrl: post.url })
    }
  },
]

//> Display post delete form on GET.
exports.post_delete_get = async (req, res, next) => {
  // Get details of post and all their books (in parallel)
  const [post, allCommentsByPost] = await Promise.all([
    Post.findById(req.params.id).exec(),
    Comment.find({ post: req.params.id }).exec(),
  ])
  if (post === null) {
    // No results.
    res.json({ redirectURL: '/notFound' })
  }

  res.json({
    title: 'Delete Post',
    post,
    post_comments: allCommentsByPost, // not needed
  })
}

//> Handle Post delete on POST.
exports.post_delete_post = async (req, res, next) => {
  // Get details of post and all their books (in parallel)
  const [post, allCommentsByPost] = await Promise.all([
    Post.findById(req.params.id).exec(),
    Comment.find({ post: req.params.id }).exec(),
  ])
  if (post === null) {
    res.json({ redirectURL: '/notFound' })
  }
  await Post.findByIdAndDelete(req.params.id)

  if (allCommentsByPost.length > 0) {
    allCommentsByPost.map(async (comment) => {
      await Comment.findByIdAndDelete(comment._id)
    })
  }

  res.json({ redirectURL: '/home' })
}

// Display post update form on GET.
exports.post_update_get = async (req, res, next) => {
  console.log(req.param.id)
  const post = await Post.findById(req.params.id).exec()
  if (post === null) {
    // No results.
    debug(`id found on update: ${req.params.id} doesn't match records`)
    const err = new Error('Post not found')
    err.status = 404
    return next(err)
  }
  res.json({
    title: 'Update Post',
    post,
  })
}

//> Handle post update on POST.
exports.post_update_post = [
  // Validate and sanitize fields.
  body('title')
    .trim()
    .isLength({ min: 1 }, 'Title must not be empty')
    .escape()
    .withMessage('Title name must be specified.'),
  body('desc').trim().isLength({ min: 1 }, 'Description must not be empty'),

  // Process request after validation and sanitization.
  async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req)

    // Create a Post object with escaped/trimmed data and old id.
    const post = new Post({
      title: req.body.title,
      desc: req.body.desc,
      _id: req.params.id, // This is required, or a new ID will be assigned!
      likes: req.param.postId,
    })

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.
      res.json({
        title: 'Update Post',
        post,
        errors: errors.array(),
      })
      return
    } else {
      // Data from form is valid. Update the record.
      const updatedPost = await Post.findByIdAndUpdate(req.params.id, post, {})
      // Redirect to book detail page.
      res.json({ postUrl: updatedPost.url })
    }
  },
]

// Add LIKE to a post:
exports.put_update_post_likes_add = async (req, res) => {
  const post = await Post.findByIdAndUpdate(req.params.id, { $push: { likes: req.body.user } })
  if (!post) return res.status(404).send('post with the given id is not found')
  res.json(post)
}

// Remove like from a post:
exports.put_update_post_likes_delete = async (req, res) => {
  const post = await Post.findByIdAndUpdate(req.params.id, { $pull: { likes: req.body.user } })
  if (!post) return res.status(404).send('post with the given id is not found')
  res.json(post)
}

// Add comment to a post
exports.put_update_post_comments = async (req, res) => {
  const post = await Post.findByIdAndUpdate(req.params.id, { $push: { comments: req.body.comment } })
  if (!post) return res.status(404).send('post with the given id is not found')
  res.json(post)
}
