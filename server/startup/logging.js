// Set up winston
const winston = require('winston');
const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = winston.createLogger({
  format: combine(
    label({ label: 'my-app' }), // Add a custom label to each log entry
    timestamp(),
    myFormat
  ),
  transports: [
    new winston.transports.Console(), // Logs to the console
    // Optionally add other transports:
    new winston.transports.File({ filename: 'app.log' }) // Logs to a file
  ]
});

module.exports = logger