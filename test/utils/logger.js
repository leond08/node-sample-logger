const log4js = require('log4js');
const path = require('path');

// Logger configuration
log4js.configure({
  appenders: { 
      fileAppender: { type: 'file', filename: './log/error.log', backups: 1, maxLogSize: 1048576 },
      console: { type: 'console' } 
  },
  categories: { 
      default: { appenders: ['fileAppender', 'console'], level: 'debug' } 
  }
});
const log4jsLogger = log4js.getLogger('Node');

//* *********************************************************
//* makoto-logger                                           *
//* To use this class, require() it and access one of       *
//* its helper functions to log output from your            *
//* JavaScript code. Call the function that corresponds     *
//* to the level of granularity that you want. The message  *
//* will appear if its Level is >= the current log level    *
//* (default: INFO). Standard logging stuff. No surprises.  *
//*                                                         *
//* trace() - log a trace message (finest granularity)      *
//* debug()                                                 *
//* info()                                                  *
//* warn()                                                  *
//* error()                                                 *
//* fatal() - log a fatal message (coarsest granularity)    *
//*                                                         *
//* setLogLevel() - sets the log level to the specified     *
//* Level.                                                  *
//* Setting the LogLevel to Level.OFF turns off logging.    *
//* *********************************************************
const Level = {
  TRACE: {priority: 0, outputString: 'TRACE'},
  DEBUG: {priority: 100, outputString: 'DEBUG'},
  INFO: {priority: 200, outputString: 'INFO'},
  WARN: {priority: 300, outputString: 'WARN'},
  ERROR: {priority: 400, outputString: 'ERROR'},
  FATAL: {priority: 500, outputString: 'FATAL'},
  OFF: {priority: 1000, outputString: 'OFF'},
};
// The default log level
const DEFAULT_LOG_LEVEL = Level.INFO;
// The current Log level
let logLevel = DEFAULT_LOG_LEVEL;

/**
 * Allows dependent module to mutate the log level
 * to the new level value.
 * @param {Level} newLevel - the new log Level
 */
function setLogLevel(newLevel) {
  logLevel = newLevel;
}

/**
 * This function computes a message
 *
 * @param {Level} messageLogLevel - the Level of the message to be logged.
 *
 * @param {String} message - the Message to be logged. Required.
 *
 * @param {String} source - the source of the message. What that means is really
 * up to the one who defines the message. It could mean, for example, the
 * function within which the message originated.
 * Optional. If not set, just the message passed in is logged.
 *
 * @return {String} computedMessage - the actual computed message (complete with
 * any decorations), or an empty string if the messageLogLevel was below
 * the current log level at the moment this function was called.
 */
function log(messageLogLevel, message, source) {
  let computedMessage = null;
  if (messageLogLevel.priority >= logLevel.priority) {
    // Compute the message text based on log level output string, and whether
    // / or not the startTime was present
    let now = Date.now();
    let outputString = now.toString() + ':' + messageLogLevel.outputString;
    computedMessage = outputString + ': ' + ((source) ? source + ': ' : '') +
      message;
    // Now log the computed message
    logMessage(computedMessage, messageLogLevel);
  }
  return computedMessage;
}

/**
 * Performs the actual logging of the computed message.
 *
 * @param {String} computedMessage - the message to log (computed elsewhere)
 * @param {LogLevel} messageLogLevel - the LogLevel of the message to be logged
 */
function logMessage(computedMessage, messageLogLevel) {
  switch (messageLogLevel) {
    case Level.TRACE:
      log4jsLogger.trace(computedMessage);
      break;
    case Level.DEBUG:
      log4jsLogger.debug(computedMessage);
      break;
    case Level.WARN:
      log4jsLogger.warn(computedMessage);
      break;
    case Level.ERROR:
      log4jsLogger.error(computedMessage);
      break;
    case Level.FATAL:
      log4jsLogger.fatal(computedMessage);
      break;
    case Level.INFO:
    default:
      log4jsLogger.info(computedMessage);
  }
}

/**
 * Helper function - TRACE level messages
 * @param {String} message - the message to log
 * @param {String} source - the message source
 * @return {String} computedMessage - the actual computed message (complete with
 * any decorations), or an empty string if the messageLogLevel was below
 * the current log level at the moment this function was called.
 */
function trace(message, source) {
  return log(Level.TRACE, message, source);
}

/**
 * Helper function - DEBUG level messages
 * @param {String} message - the message to log
 * @param {String} source - the message source
 * @return {String} computedMessage - the actual computed message (complete with
 * any decorations), or an empty string if the messageLogLevel was below
 * the current log level at the moment this function was called.
 */
function debug(message, source) {
  return log(Level.DEBUG, message, source);
}

/**
 * Helper function - INFO level messages
 * @param {String} message - the message to log
 * @param {String} source - the message source
 * @return {String} computedMessage - the actual computed message (complete with
 * any decorations), or an empty string if the messageLogLevel was below
 * the current log level at the moment this function was called.
 */
function info(message, source) {
  return log(Level.INFO, message, source);
}

/**
 * Helper function - WARN messages
 * @param {String} message - the message to log
 * @param {String} source - the message source
 * @return {String} computedMessage - the actual computed message (complete with
 * any decorations), or an empty string if the messageLogLevel was below
 * the current log level at the moment this function was called.
 */
function warn(message, source) {
  return log(Level.WARN, message, source);
}

/**
 * Helper function - ERROR messages
 * @param {String} message - the message to log
 * @param {String} source - the message source
 * @return {String} computedMessage - the actual computed message (complete with
 * any decorations), or an empty string if the messageLogLevel was below
 * the current log level at the moment this function was called.
 */
function error(message, source) {
  return log(Level.ERROR, message, source);
}

/**
 * Helper function - FATAL messages
 * @param {String} message - the message to log
 * @param {String} source - the message source
 * @return {String} computedMessage - the actual computed message (complete with
 * any decorations), or an empty string if the messageLogLevel was below
 * the current log level at the moment this function was called.
 */
function fatal(message, source) {
  return log(Level.FATAL, message, source);
}

module.exports.Level = Level;
module.exports.DEFAULT_LOG_LEVEL = DEFAULT_LOG_LEVEL;
// Lets the dependent modules set the log level
module.exports.setLogLevel = setLogLevel;
//
module.exports.trace = trace;
module.exports.debug = debug;
module.exports.info = info;
module.exports.warn = warn;
module.exports.error = error;
module.exports.fatal = fatal;
// Low-level API function
module.exports.log = log;