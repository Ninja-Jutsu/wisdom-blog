const mongoose = require('mongoose')

const Schema = mongoose.Schema

const PostSchema = new Schema({
  title: { type: String, required: true, maxlength: 30, minlength: 5 },
  desc: { type: String, required: true, maxlength: 250, minlength: 5 },
  user: { type: Schema.Types.ObjectId, ref: 'user'},
  createdOn: { type: Date, default: new Date() },
  comments : [{ type: Schema.Types.ObjectId, ref: 'comment'}],
  likes : [{ type: Schema.Types.ObjectId, ref: 'user'}]
})

// Virtual for book's URL
PostSchema.virtual('url').get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/post/${this._id}`
})

// Export model
module.exports = mongoose.model('Post', PostSchema)
