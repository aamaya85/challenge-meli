const _ = require('underscore')

module.exports = {
  getLocation: (req, res) => {
    const distances = req.body.satellites.map((sat) => sat.distance)
    if (coords = getLocation(distances)){
      res.status(200).send({
        position: coords,
        message: "Not yet"
      })
    } else {
      res.status(404).send('Error in request')
    }
  },
  getMessage: (req, res) => {
    
    const message = getMessage(_.pluck(req.body.satellites, 'message'));
      res.status(200).send({
        message
      })
    
  }
}


const getMessage = (messages) => {

  messages = _.zip(... messages) // Agrupar las distintas palabras de los mensajes en orden de llegada
  messages = messages.map((message) => _.compact(message)) // Remover palabras vacías
  messages = _.flatten(messages); // Unificar palabras en un array único
  
  let decriptedMessage = []

  // Comparamos y removemos las palabras consecutivas (repetidas)
  for(let i = 0, length = messages.length; i < length; i++){
    if (i == 0 || messages[i-1].toString() !== messages[i].toString()) {
      decriptedMessage.push(messages[i]);
    }
  }

  const originalMessage = decriptedMessage.join(" ").replace(",", " ")

  return originalMessage

}

const getLocation = (distances) => {

  // Current positions
  const satellitesPositions = {
    kenobi: [50, 1],
    skywalker: [0, 2],
    sato: [40, 3]
  }

  const x1 = satellitesPositions.kenobi[0]
        y1 = satellitesPositions.kenobi[1]

  const x2 = satellitesPositions.skywalker[0]
        y2 = satellitesPositions.skywalker[1]

  const x3 = satellitesPositions.sato[0]
        y3 = satellitesPositions.sato[1]

  const r1 = distances[0]
        r2 = distances[1]
        r3 = distances[2]

  A = ((-2) * x1 + 2 * x2)
  B = ((-2) * y1 + 2 * y2)
  C = (r1 ** 2) - (r2 ** 2) - (x1 ** 2) + (x2 ** 2) - (y1 ** 2) + (y2 ** 2)

  D = ((-2) * x2 + 2 * x3)
  E = ((-2) * y2 + 2 * y3)
  F = (r2 ** 2) - (r3 ** 2) - (x2 ** 2) + (x3 ** 2) - (y2 ** 2) + (y3 ** 2)

  x = (C * E - F * B) / (E * A - B * D)
  y = (C * D - A * F) / (B * D - A * E)

  if (Number.isNaN(x) || Number.isNaN(y)) return false

  return { x: parseFloat(x.toFixed(2)), y: parseFloat(y.toFixed(2)) }

}
