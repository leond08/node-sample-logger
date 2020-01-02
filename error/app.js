'use strict'

const { Validation, ValidationError, PermissionError } = require('./common')
const logger = require('./logger')


let param1 = ''
let param2 = 'fdafsdfsfdsf'
const notNull = Validation.isNull(param1)
const allNumeric = Validation.isNumeric(param2)

logger.setLogLevel(logger.Level.TRACE)

if (!allNumeric) {
    const errrr = new ValidationError('Value must contain numbers only').toJson()
    console.log(errrr)
}

if (!notNull) {
    const errrr = new ValidationError('Required fields must not be null').toJson()
    logger.debug(errrr.error.message, 'app.js')
    logger.info(errrr.error.message, 'app.js')
    logger.error(errrr.error.message, 'app.js')
    console.log(errrr)
}

try {
    throw new PermissionError(401, 'Permission denied')
}
catch(e) {
    if (e instanceof PermissionError) console.log(e.toJson())
}