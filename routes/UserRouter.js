const Router = require('express').Router()
const UserController = require('../controllers/UserController')
const {
    getToken,
    createToken,
    verifyToken,
} = require('../middleware/JwtHandler')

Router.get('/', UserController.getUsers)
Router.get('/:id', UserController.getUser)
Router.get('/:id/tasks', UserController.getUserTasks)
Router.post('/', UserController.createUser)
Router.put('/:id', UserController.updateUser)
Router.delete('/:id', UserController.deleteUser)
Router.post('/login', UserController.signInUser, createToken)
Router.get('/refresh/session',
    getToken,
    verifyToken,
    UserController.refreshSession
)

module.exports = Router