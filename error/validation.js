'use strict'

const ValidationError = require('./common').ValidationError
const WriteError = require('./common').WriteError


class Validation {

    static isNull(param) {
        return param ? true : false
    }
    
    static isNumeric(param) {
        return new RegExp(/^[0-9]*$/).test(param)
    }
}

module.exports = {
    Validation
}