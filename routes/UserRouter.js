const Router = require('express').Router()
const UserController = require('../controllers/UserController')

Router.get('/', UserController.getUsers)
Router.get('/:id', UserController.getUser)
Router.get('/:id/tasks', UserController.getUserTasks)
Router.post('/', UserController.createUser)
Router.put('/:id', UserController.updateUser)
Router.delete('/:id', UserController.deleteUser)

module.exports = Router