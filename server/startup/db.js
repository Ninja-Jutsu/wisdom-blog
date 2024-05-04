const mongoose = require('mongoose')
require('dotenv').config()
const logger = require('./logging')

// Connect :
module.exports = function (app) {
  const DB_URL = process.env.DB_URL
  mongoose
    .connect(DB_URL)
    .then(() => logger.info('Connected to MongoDB..'))
    .catch((err) => logger.error(err))

  const port = process.env.PORT || 3000
  app.listen(port, () => logger.info(`Server is listening on port: ${port}`))
}
