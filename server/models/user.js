const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({
  username: { type: String, required: true, maxlength: 30, minlength: 5 },
  email: {type : String , require: true, unique: true},
  password: { type: String, required: true, maxlength: 16, minlength: 5 },
  isAdmin: { type: Boolean, default: false },
  badges : [{ type: Schema.Types.ObjectId, ref: 'Badge'}],
  posts : [{ type: Schema.Types.ObjectId, ref: 'Post'}]
})

// Virtual for book's URL
UserSchema.virtual('url').get(function () {
  return `/user/${this._id}`
})

// Export model
module.exports = mongoose.model('User', UserSchema)
