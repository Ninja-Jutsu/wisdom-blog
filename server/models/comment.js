const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CommentSchema = new Schema({
  text: { type: String, maxlength: 500, minlength: 1 },
  user: { type: Schema.Types.ObjectId, ref: 'User', require: true },
  post: { type: Schema.Types.ObjectId, ref: 'Post', require: true },
  createdOn: { type: Date, default: new Date() },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
})

// Virtual for comment's URL
//!Not needed
CommentSchema.virtual('url').get(function () {
  return `/api/comment/${this._id}`
})

// Virtual Date Formatter
CommentSchema.virtual('Date_formatted').get(function () {
  const createdOn = this.createdOn
    ? DateTime.fromJSDate(this.createdOn).toLocaleString(DateTime.DATE_MED)
    : ''
  return date
})

module.exports = mongoose.model('Comment', CommentSchema)
