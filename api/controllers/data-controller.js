const fn = require('./data-functions.js')
const _ = require('underscore')

module.exports = {

  setSatelliteData: (req, res) => {
    const satellite = {
      name: req.params.satellite_name,
      distance: req.body.distance,
      message: req.body.message
    }

    const satellitesData = fn.setSatelliteData(satellite)
    if (satellitesData) {
      res.status(200).send({ message: 'Datos registrados correctamente', satellites: satellitesData })
    } else {
      res.status(500).send({ message: 'Error al registrar los datos' })
    }
  },

  getLocationSplit: (req, res) => {
    const sourceData = fn.getSourceData()
    if (sourceData) {
      res.status(200).send(sourceData)
    } else {
      res.status(404).send({ message: 'No se pudo determinar la ubicación o el mensaje debido a que no hay suficiente información.' })
    }
  },

  getLocation: (req, res) => {
    // Chequear si algún dato no está definido
    if (_.some(req.body.satellites, s => (typeof s.distance === 'undefined') || (typeof s.name === 'undefined') || (typeof s.message === 'undefined'))) {
      res.status(404).send({ message: 'No se pudo determinar la ubicación o el mensaje. (faltan datos)' })
    }

    // Seteo las distancias
    const distances = {}
    _.each(req.body.satellites, sat => { distances[sat.name] = sat.distance })

    // Obtengo la posición y el mensaje
    const position = fn.getLocation(distances)
    const message = fn.getMessage(_.pluck(req.body.satellites, 'message'))

    if ((position) && (message)) {
      res.status(200).send({
        position: position,
        message: message
      })
    } else {
      res.status(404).send({ message: 'No se pudo determinar la ubicación o el mensaje.' })
    }
  }

}
