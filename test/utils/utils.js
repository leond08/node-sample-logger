'use strict'

const https = require('https')
const axios = require('axios');



/**
 * Helper function:
 * Make a call to the specified requestPath, and when the
 * results are done, invoke the callback.
 * 
 * @param {String} requestMethod - the HTTP method (GET, POST, etc)
 * @param {String} requestPath - the request path (e.g., /lists, /items, etc)
 * @param {String} postData - a JSON string (must be well-formed) containing any
 * data that is to be sent in the request body
 * @param {Object} headers - additional HTTP headers
 * 
 */


const httpRequest = (requestMethod, requestPath, postData, headers) => {
    let options = ''
    if (requestMethod == 'GET') {
        options = {
            headers
        }
        return new Promise((resolve, reject) => {
            axios.get(`https://jsonplaceholder.typicode.com${requestPath}`, options)
                 .then(result => {
                    resolve(result.data)
                 })
                 .catch(error => {
                    reject(error)
                 })
        })
    }
    else {
        options = {
            method: requestMethod,
            url: `https://jsonplaceholder.typicode.com${requestPath}`,
            data: postData,
            ...headers
        }
        console.log(options)
        return new Promise((resolve, reject) => {
            axios.request(options)
                 .then(result => {
                    resolve(result.data)
                 })
                 .catch(error => {
                    reject(error)
                 })
        })
    }
}

module.exports.httpRequest = httpRequest