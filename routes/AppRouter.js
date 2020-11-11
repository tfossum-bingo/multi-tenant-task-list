const Router = require('express').Router()

// const DesignerRouter = require('./DesignerRouter')
// const OrganizationRouter = require('./OrganizationRouter')
// const AircraftRouter = require('./AircraftRouter')

Router.get('/', (req, res) => res.send('This is root!*'))

// Router.use('/manufacturers', ManufacturerRouter)
// Router.use('/designers', DesignerRouter)
// Router.use('/aircrafts', AircraftRouter)

module.exports = Router