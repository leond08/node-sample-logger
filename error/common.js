'use strict'

/**
 * Super class BaseError
 * 
 * @extends {Error}
 */
class BaseError extends Error {
    constructor(err) {
        super(err)

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, BaseError);
        }
        
        this.name = 'BaseError'
        this.message = err
    }

    toJson() { 
        return {
            error: {
                name: this.name,
                message: this.message
            }
        }
    }
}

/**
 * Creates a new ValidationError
 * 
 * @class
 * @param {string} message The error message
 * @returns {ValidationError} A ValidationError instance
 * @extends {BaseError}
 */
class ValidationError extends BaseError {
    constructor(err) {
      super(err)

      this.name = 'ValidationError'
      this.message = err
      
    }
}

/**
 * Creates a new PermissionError
 * 
 * @class
 * @param {number} status HTTP status
 * @param {string} message The error message
 * @returns {PermissionError} A PermissionError instance
 * @extends {BaseError}
 */
class PermissionError extends BaseError {
    constructor(status = 401, err) {
        super(err)

        this.name = 'PermissionError'
        this.message = err
        this.status = status
    }

    toJson() {
        return {
            error: {
                status: this.status,
                name: this.name,
                message: this.message
            }
        }
    }
}

/**
 * Class Validation
 * 
 */
class Validation {

    /**
     * Check if value is null
     * 
     * @param {*} param 
     */
    static isNull(param) {
        return param ? true : false
    }
    /**
     * Check if value is numeric
     * 
     * @param {*} param 
     */
    static isNumeric(param) {
        return new RegExp(/^[0-9]*$/).test(param)
    }
    
}


module.exports = {
    ValidationError,
    PermissionError,
    Validation
}