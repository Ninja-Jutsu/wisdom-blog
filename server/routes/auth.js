const express = require('express')
const router = express.Router() // or const {Router} = require('express') then router = Router()
const authController = require('../controllers/authController')

// get the signup page
router.get('/signup', authController.signup_get) //!DONE tested
// Add user to db
router.post('/signup', authController.signup_post) //!DONE tested
// get the login page
router.get('/login', authController.login_get) //!DONE tested
// login 
router.post('/login', authController.login_post) //!DONE tested
// logout
router.get('/logout', authController.logout_get) //!DONE tested
// get current user
router.get('/current', authController.get_currentUser)

module.exports = router
