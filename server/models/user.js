const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


const Schema = mongoose.Schema

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Please enter a username'],
    maxlength: [30, 'username must be maximum 30 characters long'],
    minlength: [5, 'username must be at least 5 characters long'],
  },
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    lowercase: true,
    unique: true,
    validate: {
      validator: function (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
      },
      message: 'Invalid email format', // Custom error message
    },
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    maxlength: [16, 'username must be maximum 30 characters long'],
    minlength: [5, 'username must be at least 5 characters long'],
  },
  isAdmin: { type: Boolean, default: false },
  badges: [{ type: Schema.Types.ObjectId, ref: 'Badge' }],
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
})

UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

UserSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email })
  if (user) {
    const auth = await bcrypt.compare(password, user.password) // this will return a Boolean
    if (auth) {
      return user
    }
    return 'incorrect password'
  }
  return 'incorrect email'
}

// Virtual for book's URL
UserSchema.virtual('url').get(function () {
  return `/users/${this._id}`
})

// Export model
module.exports = mongoose.model('User', UserSchema)
