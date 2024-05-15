const debug = require('debug')('comment')
const { body, validationResult } = require('express-validator')
const Post = require('../models/post') // will be used later
const Comment = require('../models/comment')
const user = require('../models/user') // will be used later

//> Display list of all Comments.
//!NOT NEEDED
exports.comment_list = async (req, res) => {
  const allComments = await Comment.find().sort({ createdOn: 1 }).exec()
  res.status(200).json({
    comments_list: allComments,
  })
}

//> Display detail page for a specific Post.
//!NOT NEEDED
exports.comment_detail = async (req, res, next) => {
  const [comment] = await Promise.all([Comment.findById(req.params.id).populate('user').exec()])
  if (!comment) {
    const err = new Error('no such comment')
    res.status(404)
    return next(err)
  }
  res.status(200).json({
    title: 'Comment Details',
    comment,
  })
}

//> Display comment create form on GET.
//!NOT NEEDED
exports.comment_create_get = (req, res, next) => {
  res.status(200).json({ title: 'Create comment' })
}

//> Handle Comment create on POST req.
exports.comment_create_post = [
  // Validate and sanitize fields.
  body('text')
    .trim()
    .isLength({ min: 1, max: 500 }, 'Comment must 1 at least characters long')
    .withMessage('Comment must 1 at least characters long')
    .escape(),

  // Process request after validation and sanitization.
  async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req)

    // Create Post object with escaped and trimmed data
    const comment = new Comment({
      text: req.body.text.replace(/&#x27;/g, "'"),
      post: req.body.post,
      user: req.body.user,
    })
    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      console.log('errors exist')
      res.json({
        text,
        errors: errors.array(),
      })
      return
    } else {
      // Data from form is valid.

      // Save Comment.
      await comment.save()
      // Redirect to new Comment record.
      res.json({ comment, commentUrl: comment.url })
    }
  },
]

//> Display comment delete form on GET.
//!Not needed
exports.comment_delete_get = async (req, res, next) => {
  // Get details of comment and all their books (in parallel)
  const [comment] = await Promise.all([Comment.findById(req.params.id).exec()])
  if (comment === null) {
    // No results.
    res.json({ redirectURL: '/notFound' })
  }

  res.json({ comment })
}

//> Handle comment delete on POST.
exports.comment_delete_post = async (req, res, next) => {
  // Get details of comment and all their books (in parallel)
  const [comment] = await Promise.all([Comment.findById(req.params.id).exec()])
  if (comment === null) {
    res.json({ redirectURL: '/notFound' })
  }
  console.log('deleted comment: ' + comment.text)
  await Comment.findByIdAndDelete(req.params.id)

  res.json({ redirectURL: '/home' })
}

// Display comment update form on GET.
//! Not needed for now
exports.comment_update_get = async (req, res, next) => {
  const comment = await Comment.findById(req.params.id).exec()
  if (comment === null) {
    // No results.
    debug(`id found on update: ${req.params.id} doesn't match records`)
    const err = new Error('Comment not found')
    err.status = 404
    return next(err)
  }
  res.json({
    title: 'Update comment',
    comment,
  })
}

//> Handle comment update on POST.
//! not needed for now
exports.comment_update_post = [
  // Validate and sanitize fields.
  body('text')
    .trim()
    .isLength({ min: 3 }, { max: 500 })
    .withMessage('Comment must 3 at least characters long')
    .escape(),

  // Process request after validation and sanitization.
  async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req)

    // Create a Comment object with escaped/trimmed data and old id.
    const comment = new Comment({
      text: req.body.text.replace(/&#x27;/g, "'"),
      _id: req.params.id, // This is required, or a new ID will be assigned!
    })

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.
      res.json({
        title: 'Update Comment',
        comment,
        errors: errors.array(),
      })
      return
    } else {
      // Data from form is valid. Update the record.
      const updatedComment = await Comment.findByIdAndUpdate(req.params.id, comment, {})
      // Redirect to book detail page.
      res.json({ updatedComment: updatedComment.url })
    }
  },
]
