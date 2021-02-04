const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const api = require('./api/routes')

app.use(express.json())
// app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api', api)

module.exports = app