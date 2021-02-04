module.exports = {
  getLocation: (req, res) => {
    const distances = req.body.satellites.map((sat) => sat.distance)
    if (coords = getLocation(distances)){
      res.status(200).send(coords)
    } else {
      res.status(404).send('Error in request')
    }
  }
}


const getLocation = (distances) => {

  // Current positions
  const satellitesPositions = {
    kenobi: [50, 1],
    skywalker: [0, 2],
    sato: [40, 3]
  }

  const x1 = satellitesPositions.kenobi[0], y1 = satellitesPositions.kenobi[1]
  const x2 = satellitesPositions.skywalker[0], y2 = satellitesPositions.skywalker[1]
  const x3 = satellitesPositions.sato[0], y3 = satellitesPositions.sato[1]
  const r1 = distances[0], r2 = distances[1], r3 = distances[2]

  A = ((-2) * x1 + 2 * x2)
  B = ((-2) * y1 + 2 * y2)
  C = (r1 ** 2) - (r2 ** 2) - (x1 ** 2) + (x2 ** 2) - (y1 ** 2) + (y2 ** 2)

  D = ((-2) * x2 + 2 * x3)
  E = ((-2) * y2 + 2 * y3)
  F = (r2 ** 2) - (r3 ** 2) - (x2 ** 2) + (x3 ** 2) - (y2 ** 2) + (y3 ** 2)

  x = (C * E - F * B) / (E * A - B * D)
  y = (C * D - A * F) / (B * D - A * E)

  if (Number.isNaN(x) || Number.isNaN(y)) return false

  return { x: x.toFixed(2), y: y.toFixed(2) }

}
