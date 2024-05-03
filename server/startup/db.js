const winston = require('winston')
const mongoose = require('mongoose')

module.exports = function () {
  const DB_URL = process.env.DB_URL
  mongoose
    .connect(DB_URL, { useNewUrlParser: true })
    .then(() => winston.info('Connected to MongoDB..'))
}
