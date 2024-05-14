const express = require('express')
const router = express.Router()

// Require controller modules.
const post_controller = require('../controllers/postController')

//! post ROUTES ///

// GET request for creating a post. NOTE This must come before routes that display post (uses id).
router.get('/create', post_controller.post_create_get) //!DONE // Tested

// POST request for creating post.
router.post('/create', post_controller.post_create_post) //!DONE // Tested

// GET request to delete post.
router.get('/:id/delete', post_controller.post_delete_get) //!DONE // Tested

// POST request to delete post.
router.post('/:id/delete', post_controller.post_delete_post) //!DONE // Tested

// GET request to update post.
router.get('/:id/update', post_controller.post_update_get) //!DONE // Tested

// POST request to update post.
router.post('/:id/update', post_controller.post_update_post) //!DONE // Tested

// GET request for one post.
router.get('/:id', post_controller.post_detail) //!DONE // Tested

// GET request for list of all post items.
router.get('/', post_controller.post_list) //!DONE // Tested

// Update likes
router.put('/:id', post_controller.put_update_post)

module.exports = router
