const { model } = require('mongoose')

const OrganizationSchema = require('./models/organization')
const TaskSchema = require('./models/task')
const UserSchema = require('./models/user')

const Organization = model('organization', OrganizationSchema)
const Task = model('task', TaskSchema)
const User = model('user', UserSchema)


module.exports = {
    Organization,
    Task,
    User
}