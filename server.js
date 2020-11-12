const AppRouter = require('./routes/AppRouter')
const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
// const helmet = require('helmet')
const db = require('./db/connection')
const { port } = require('./db/connection')

const PORT = process.env.PORT || 3001
const app = express()

app.use(logger('dev'))
// app.use(helmet())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api', AppRouter)

db.on('error', console.error.bind(console, 'MongoDB connection error: '))

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))