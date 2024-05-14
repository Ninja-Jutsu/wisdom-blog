const { body, validationResult } = require('express-validator')
const User = require('../models/user')
const Post = require('../models/post')

//> Display list of all Users.
exports.user_list = async (req, res, next) => {
  const allUsers = await User.find().sort({ username: 1 }).exec()
  res.status(200).json({
    title: 'User List',
    users_list: allUsers,
  })
}

//> Display detail page for a specific User.
exports.user_detail = async (req, res, next) => {
  // console.log((req.params.id))
  const [user, allPostsByUser] = await Promise.all([
    User.findById(req.params.id).populate('posts').exec(),
    Post.find({ user: req.params.id }, 'title desc').exec(),
  ])
  if (user === null) {
    const err = new Error('no such user')
    res.status(404).json({ err: 'no such user' })
    return next(err)
  }
  res.status(200).json({
    title: 'User Details',
    user,
    user_posts: allPostsByUser,
  })
}

//> Display User create form on GET.
exports.user_create_get = (req, res, next) => {
  res.status(200).json({ title: 'Create User' })
}

//> Display user delete form on GET.
exports.user_delete_get = async (req, res, next) => {
  // Get details of user and all their books (in parallel)
  // console.log(req.params.id)
  const [user, allPostsByUser] = await Promise.all([
    User.findById(req.params.id).exec(),
    Post.find({ user: req.params.id }, 'title summary').exec(),
  ])
  console.log(user)
  if (user === null) {
    // No results.
    res.redirect('/api')
  }

  res.json({
    title: 'Delete User',
    user: user,
    user_posts: allPostsByUser,
  })
}

//> Handle User delete on POST.
exports.user_delete_post = async (req, res, next) => {
  // Get details of user and all their books (in parallel)
  const [user, allPostsByUser] = await Promise.all([
    User.findById(req.params.id).exec(),
    Post.find({ user: req.params.id }, 'title summary').exec(),
  ])
  if (user === null) {
    res.json({ redirectURL: '/notFound' })
  }
  if (allPostsByUser.length > 0) {
    // User has posts. Render in same way as for GET route.
    res.json({
      title: 'Delete User',
      user,
      user_posts: allPostsByUser,
    })
  } else {
    // USer has no posts. Delete object and redirect to home page.
    await User.findByIdAndDelete(req.params.id)
    res.json({ redirectURL: '/home' })
  }
}

// Display user update form on GET.
exports.user_update_get = async (req, res, next) => {
  const user = await User.findById(req.params.id).exec()
  if (user === null) {
    // No results.
    debug(`id found on update: ${req.params.id} doesn't match db record`)
    const err = new Error('User not found')
    err.status = 404
    return next(err)
  }
  res.json({
    title: 'Update User',
    user: user,
  })
}

//> Handle user update on POST.
exports.user_update_post = [
  // Validate and sanitize fields.
  body('username').trim().isLength({ min: 1 }).escape().withMessage('First name must be specified.'),
  body('email', 'Invalid email').trim().isLength({ min: 1 }).isEmail(),
  body('password', 'Invalid password').trim().notEmpty(),

  // Process request after validation and sanitization.
  async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req)

    // Create a User object with escaped/trimmed data and old id.
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      _id: req.params.id, // This is required, or a new ID will be assigned!
    })

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.
      res.json({
        title: 'Update User',
        user,
        errors: errors.array(),
      })
      return
    } else {
      // Data from form is valid. Update the record.
      console.log('find&update')
      const updatedUser = await User.findByIdAndUpdate(req.params.id, user, {})
      // Redirect to book detail page.
      res.json({ userUrl: updatedUser.url })
    }
  },
]
