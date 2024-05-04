const express = require('express')
const router = express.Router()

// Require controller modules.
const comment_controller = require('../controllers/commentsController')

//! comment ROUTES ///

// GET request for creating a comment. NOTE This must come before routes that display comment (uses id).
router.get('/comment/create', comment_controller.comment_create_get)

// comment request for creating comment.
router.post('/comment/create', comment_controller.comment_create_post) //!DONE Tested

// GET request to delete comment.
router.get('/comment/:id/delete', comment_controller.comment_delete_get) //!DONE Tested

// POST request to delete comment.
router.post('/comment/:id/delete', comment_controller.comment_delete_post) //!DONE Tested

// GET request to update comment.
router.get('/comment/:id/update', comment_controller.comment_update_get) //!DONE Tested

// POST request to update comment.
router.post('/comment/:id/update', comment_controller.comment_update_post) //!DONE Tested

// GET request for one comment.
router.get('/comment/:id', comment_controller.comment_detail) //!DONE Tested

// GET request for list of all comment items.
router.get('/', comment_controller.comment_list) //!DONE Tested

module.exports = router
