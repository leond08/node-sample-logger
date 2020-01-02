'use strict'

const { Validation, ValidationError, PermissionError } = require('./common')
const logger = require('./logger')
const request = require('./utils').httpRequest

const data = {
    title: 'foo',
    body: 'bar',
    userId: 1
}

const value = "1sdfasdf"



try {
    const validation1 = Validation.isNumeric(value);
    throw new PermissionError(401, 'Permission Denied').toJson()
}
catch (e) {
    console.log(e)
}

const options = {
    method: 'post',
    url: 'https://jsonplaceholder.typicode.com/posts',
    data: data
}

const method = 'POST'
const path = '/posts'

request(method, path, data, {data: "header", headers: { "Authorization": "Basic Auth"}})
.then(response => {
    console.log(response)
})
.catch(error => {
    console.log(error)
})






