const { Task, User } = require('../db/schema')

const getUsers = async (req, res) => {
    console.log("HIT getUsers")
    try {
        const users = await User.find()
        // const users = {
        //     msg: "Responding to getUsers"
        // }
        return res.status(200).json({ users: users })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const getUser = async (request, response) => {
    console.log('HIT getUser')
    try {
        const { id } = request.params
        const user = await User.findById(id)
        if (user) {
            return response.status(200).json({ user: user })
        }
        return response.status(404).send('No user found with that ID.')
    } catch (error) {
        return response.status(500).send(error.message)
    }
}

const getUserTasks = async (request, response) => {
    console.log('HIT getUserTasks', request.params.id)

    try {
        // const tasks = await Task.find({ $or: [{ creator_id: request.params.id }, { assignee_id: request.params.id }] })
        const tasks = await Task.find({ $or: [{creator_id: request.params.id}, {assignee_id: request.params.id}] })
        if (tasks) {
            return response.status(200).json({ tasks: tasks })
        }
        return response.status(404).send('No tasks found for a user with that ID.')
    } catch (error) {
        return response.status(500).send(error.message)
    }
}

const createUser = async (req, res) => {
    console.log("HIT createUser")
    try {
        const user = await new User(req.body)
        await user.save()
        return res.status(201).json(user,)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const updateUser = async (request, response) => {
    console.log('HIT updateUser')
    try {
        const { id } = request.params
        await User.findByIdAndUpdate(id, request.body, { new: true }, (err, user) => {
            if (err) {
                response.status(500).send(err)
            }
            if (!user) {
                response.status(500).send('User not found!')
            }
            return response.status(200).json(user)
        })
    } catch (error) {
        return response.status(500).json({ error: error.message })
    }
}

const deleteUser = async (request, response) => {
    console.log('HIT deleteUser')
    try {
        const { id } = request.params
        const deleted = await User.findByIdAndDelete(id)
        if (deleted) {
            return response.status(200).send('User deleted')
        }
        throw new Error('User not found!')

    } catch (error) {
        return response.status(500).send(error.message)
    }
}

module.exports = {
    getUsers,
    getUser,
    getUserTasks,
    createUser,
    updateUser,
    deleteUser
}