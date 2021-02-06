const express = require('express')
const api = express.Router()
const dataController = require('../controllers/data-controller')

api.post('/topsecret', dataController.getLocation)
// api.get('/topsecret_split/:satellite_name', dataController.getLocation)
// api.post('/topsecret_split/:satellite_name', dataController.getLocation)

module.exports = api