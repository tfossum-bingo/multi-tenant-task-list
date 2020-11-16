const { Task } = require('../db/schema')

const getTasks = async (req, res) => {
    console.log("HIT getTasks")
    try {
        const tasks = await Task.find()
        return res.status(200).json({ tasks: tasks })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const getTask = async (request, response) => {
    console.log('HIT getTask')
    try {
        const { id } = request.params
        const task = await Task.findOne({_id: id}).populate([
            {
                model: 'user',
                path: 'creator_id'
            },
            {
                model: 'user',
                path: 'assignee_id'
            }
        ])
        if (task) {
            return response.status(200).json({ task: task })
        }
        return response.status(404).send('No task found with that ID.')
    } catch (error) {
        return response.status(500).send(error.message)
    }
}

const createTask = async (req, res) => {
    console.log("HIT createTask")
    console.log('request.body: ', req.body)
    try {
        const task = await new Task(req.body)
        await task.save()
        return res.status(201).json(task,)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const updateTask = async (request, response) => {
    console.log('HIT updateTask')
    try {
        const { id } = request.params
        await Task.findByIdAndUpdate(id, request.body, { new: true }, (err, task) => {
            if (err) {
                response.status(500).send(err)
            }
            if (!task) {
                response.status(500).send('Task not found!')
            }
            return response.status(200).json(task)
        })
    } catch (error) {
        return response.status(500).json({ error: error.message })
    }
}

const deleteTask = async (request, response) => {
    console.log('HIT deleteTask')
    try {
        const { id } = request.params
        const deleted = await Task.findByIdAndDelete(id)
        if (deleted) {
            return response.status(200).send('Task deleted')
        }
        throw new Error('Task not found!')

    } catch (error) {
        return response.status(500).send(error.message)
    }
}

module.exports = {
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
}