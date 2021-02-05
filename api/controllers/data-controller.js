'use strict'

const functions = require('./data-functions.js');
const _ = require('underscore')

module.exports = {

  getLocation: async (req, res) => {
    
    const distances = {
      kenobi: _.filter(req.body.satellites, (sat) => sat.name === "kenobi"),
      skywalker: _.filter(req.body.satellites, (sat) => sat.name === "skywalker"),
      sato: _.filter(req.body.satellites, (sat) => sat.name === "sato")
    }
    
    const position = functions.getLocation(distances)
    const message = functions.getMessage(_.pluck(req.body.satellites, 'message'));

    if (position && message){
      res.status(200).send({
        position: position,
        message: message
      })
    } else {
      res.status(404).send()
    }
  },

}
