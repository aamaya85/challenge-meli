'use strict'

const _ = require('underscore')
let satellites = []

const getSourceData = () => {
  if (satellites.length > 2) {
    const distances = {}
    _.each(satellites, sat => { distances[sat.name] = sat.distance })

    const position = getLocation(distances)
    const message = getMessage(_.pluck(satellites, 'message'))

    if ((position) && (message)) {
      return ({ position, message })
    }
  } else return false
}

const setSatelliteData = (satellite) => {
  satellites = satellites.filter(s => s.name !== satellite.name)
  try {
    satellites.push(satellite)
  } catch (e) {
    console.log('error: ', e)
    return false
  }
  return satellites
}

// Función para recuperar el mensaje recepcionado
const getMessage = (messages) => {
  messages = _.zip(...messages) // Agrupar las distintas palabras de los mensajes en orden de llegada
  messages = messages.map((message) => _.compact(message)) // Remover palabras vacías ("")
  messages = _.flatten(messages) // Unificar palabras en un array único

  const decriptedMessage = []

  // Comparamos y removemos las palabras consecutivas (repetidas)
  for (let i = 0, length = messages.length; i < length; i++) {
    if (i === 0 || messages[i - 1].toString() !== messages[i].toString()) {
      decriptedMessage.push(messages[i])
    }
  }

  // Convertimos el array a un string, reemplazamos caracteres de separación
  const originalMessage = decriptedMessage.join(' ').replace(',', ' ')

  return originalMessage
}

// Función para calcular la posición de la fuente por trilateración
const getLocation = (distances) => {
  const satellitesCurrentPosition = {
    kenobi: { x: 50, y: 1 },
    skywalker: { x: 0, y: 2 },
    sato: { x: 40, y: 3 }
  }

  const x1 = satellitesCurrentPosition.kenobi.x
  const y1 = satellitesCurrentPosition.kenobi.y

  const x2 = satellitesCurrentPosition.skywalker.x
  const y2 = satellitesCurrentPosition.skywalker.y

  const x3 = satellitesCurrentPosition.sato.x
  const y3 = satellitesCurrentPosition.sato.y

  const r1 = distances.kenobi
  const r2 = distances.skywalker
  const r3 = distances.sato

  const A = ((-2) * x1 + 2 * x2)
  const B = ((-2) * y1 + 2 * y2)
  const C = (r1 ** 2) - (r2 ** 2) - (x1 ** 2) + (x2 ** 2) - (y1 ** 2) + (y2 ** 2)
  const D = ((-2) * x2 + 2 * x3)
  const E = ((-2) * y2 + 2 * y3)
  const F = (r2 ** 2) - (r3 ** 2) - (x2 ** 2) + (x3 ** 2) - (y2 ** 2) + (y3 ** 2)
  const x = (C * E - F * B) / (E * A - B * D)
  const y = (C * D - A * F) / (B * D - A * E)

  if (Number.isNaN(x) || Number.isNaN(y)) return false

  const location = { x: parseFloat(x.toFixed(2)), y: parseFloat(y.toFixed(2)) }

  return location
}

module.exports = {
  getLocation,
  getSourceData,
  getMessage,
  setSatelliteData
}
