const { createLogger, format, transports } = require('winston');

const {
  combine, timestamp, colorize, errors, splat, json, simple
} = format;

const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    errors({ stack: true }),
    splat(),
    json()
  ),
  transports: [
    new transports.Console({
      format: combine(
        colorize(),
        simple()
      )
    }),
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'all.log' })
  ]
});

module.exports = logger;
