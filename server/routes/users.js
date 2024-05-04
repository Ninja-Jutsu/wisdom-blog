const express = require('express')
const router = express.Router()
const { requireAuth, checkUser } = require('../middleware/auth')

// Require controller modules.
const user_controller = require('../controllers/userController')

//! User ROUTES ///

// // GET catalog home page.
// router.get('/', user_controller.index)

// router.get('*', requireAuth)

// GET request for creating a user. NOTE This must come before routes that display user (uses id).
router.get('/user/create', user_controller.user_create_get) //!DONE //+Tested

// POST request for creating user. //!DONE //+Tested
// router.post('/user/create', user_controller.user_create_post) 

// GET request to delete user.//!DONE //+Tested
router.get('/user/:id/delete', user_controller.user_delete_get)

// POST request to delete user.//!DONE //+Tested
router.post('/user/:id/delete', user_controller.user_delete_post)

// GET request to update user. //!DONE //+Tested
router.get('/user/:id/update', user_controller.user_update_get)

// POST request to update user. //!DONE //+Tested
router.post('/user/:id/update', user_controller.user_update_post)

// GET request for one user. //!DONE //+Tested
router.get('/user/:id', user_controller.user_detail)

// GET request for list of all user items. //!DONE //+Tested
router.get('/', user_controller.user_list)




module.exports = router