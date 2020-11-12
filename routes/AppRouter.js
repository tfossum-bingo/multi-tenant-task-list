const Router = require('express').Router()

const OrganizationRouter = require('./OrganizationRouter')
const TaskRouter = require('./TaskRouter')
const UserRouter = require('./UserRouter')

Router.get('/', (req, res) => res.send('This is root!*'))

Router.use('/organizations', OrganizationRouter)
Router.use('/tasks', TaskRouter)
Router.use('/users', UserRouter)

module.exports = Router