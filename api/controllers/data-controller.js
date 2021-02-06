'use strict'

const functions = require('./data-functions.js');
const _ = require('underscore')

module.exports = {

  getLocation: (req, res, error) => {
    
    if (_.some(req.body.satellites, (s) => (typeof s.distance === 'undefined' || typeof s.name === 'undefined' || typeof s.message === 'undefined'))) {
      res.status(404).send({message: 'No se pudo determinar la ubicación o el mensaje. (faltan datos)'})
    }

    const distances = {
      kenobi: _.filter(req.body.satellites, (sat) => sat.name === "kenobi"),
      skywalker: _.filter(req.body.satellites, (sat) => sat.name === "skywalker"),
      sato: _.filter(req.body.satellites, (sat) => sat.name === "sato")
    }
    
    const position = functions.getLocation({
      kenobi: distances.kenobi[0].distance,
      skywalker: distances.skywalker[0].distance,
      sato: distances.sato[0].distance
    })
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
