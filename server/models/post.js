const mongoose = require('mongoose')

const Schema = mongoose.Schema

const PostSchema = new Schema({
  title: { type: String, required: true, maxlength: 30, minlength: 5 },
  desc: { type: String, required: true, maxlength: 250, minlength: 5 },
  user: { type: Schema.Types.ObjectId, ref: 'User', require: true},
  createdOn: { type: Date, default: new Date() },
  comments : [{ type: Schema.Types.ObjectId, ref: 'Comment'}],
  likes : [{ type: Schema.Types.ObjectId, ref: 'User'}]
})

// Virtual for book's URL
PostSchema.virtual('url').get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/api/posts/${this._id}`
})


module.exports = mongoose.model('Post', PostSchema)
