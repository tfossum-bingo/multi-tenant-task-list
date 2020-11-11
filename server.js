const express = require('express')

const logger = require('morgan')

const appRoutes = require('./routes/AppRouter')

const db = require('./db/connection')

const bodyParser = require('body-parser')
const { port } = require('../../hw/custom_api_hw/db/connection')

const PORT = process.env.PORT || 3001

const app = express()

app.use(bodyParser.json())

app.use(logger('dev'))

app.use('/api', appRoutes)

db.on('error', console.error.bind(console, 'MongoDB connection error: '))

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))