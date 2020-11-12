const Router = require('express').Router()
const TaskController = require('../controllers/TaskController')

Router.get('/', TaskController.getTasks)
Router.get('/:id', TaskController.getTask)
Router.post('/', TaskController.createTask)
Router.put('/:id', TaskController.updateTask)
Router.delete('/:id', TaskController.deleteTask)

module.exports = Router