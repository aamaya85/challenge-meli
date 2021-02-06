const express = require('express')
const app = express()
const api = require('./api/routes')

app.use(express.json())

app.use('/api', api)

// Error handler
app.use((req, res) => res.status(404).sendFile(__dirname + '/public/default.html'));
app.use((error, req, res, next) => {
  if (error instanceof SyntaxError) res.status(500).send({
  	message: 'Hay un error en los datos. Por favor revisar.'
  })
});

module.exports = app