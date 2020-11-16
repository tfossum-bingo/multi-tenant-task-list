import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import Logout from '../components/LogOut'
// import CreateTaskButton from '../components/CreateTaskButton'
import Task from '../components/Task'
import TaskForm from '../components/TaskForm'
import Modal from '../components/modals/Modal'
import TaskList from '../components/TaskList'
import '../styles/Task.css'
import { __GetTasks } from '../services/TaskService'
import { __GetProfile } from '../services/UserService'
import { __GetUsers } from '../services/OrganizationService'

export default class ViewTasks extends Component {
    constructor(props) {
        super()
        console.log("VT Props: ", props)
        this.state = {
            assignedTasks: null,
            createdTasks: null,
            user: null,
            displayModal: false,
            orgUsers: []
        }
    }

    componentDidMount() {
        const localStorUserID = localStorage.getItem("userId")
        let userID = ''
        if (localStorUserID) {
            userID = localStorUserID
        } else {
            userID = this.props.user._id
        }
        this.getProfile(userID)
        this.getTasks()
    }

    getTasks = async () => {
        console.log('HIT getTasks')
        const localUserId = localStorage.getItem("userId")
        const tasks = await __GetTasks(localUserId)
        const assignedTasks = this.findAssignedTasks(tasks)
        const createdTasks = this.findCreatedTasks(tasks)
        this.setState({ assignedTasks: assignedTasks, createdTasks: createdTasks })
    }

    findAssignedTasks = (tasks) => {
        
        const assignedTasks = tasks.filter(task => task.assignee_id._id === this.state.user._id)
        return assignedTasks
    }

    findCreatedTasks = (tasks) => {
        console.log("CreatedTasks: ", tasks)
        const createdTasks = tasks.filter(task => (task.assignee_id._id !== this.state.user._id && task.creator_id === this.state.user._id))
        return createdTasks
    }

    getOrganizationUsers = async () => {
        if (this.state.user) {
            console.log("getOrg: ", this.state.user.organization_id)
            const orgUsers = await __GetUsers(this.state.user.organization_id)
            const selectOptions = orgUsers.users.map((user, index) => {
                return [user._id, user.name]
            })
            this.setState({ orgUsers: selectOptions })
            console.log("After Users: ", selectOptions)
        }
    }

    getProfile = async (userId) => {
        const fetchedProfile = await __GetProfile(userId)
        this.setState({ user: fetchedProfile.user })
        this.getOrganizationUsers()
    }

    toggleModal = (e) => {
        console.log("Edit Task modal")
        this.setState({ displayModal: !this.state.displayModal })
    }

    render() {
        const { assignedTasks, createdTasks } = this.state
        console.log('ListPage User: ', this.state.user)
        if (assignedTasks !== null || createdTasks !== null) {
            return (
                <div>
                    <div className="header">
                        <h4>{this.state.user.name}</h4>
                        <div>
                            <Logout></Logout>
                        </div>
                        <div>
                            User ID: {`${this.state.user._id}`}
                        </div>
                        <button onClick={e => this.toggleModal()} >
                            New Task
                        </button>
                    </div>
                    <div>
                        <Modal show={this.state.displayModal}
                            onClick={this.toggleModal}>
                            <TaskForm selectOptions={this.state.orgUsers} creator_id={this.state.user._id} {...this.props} />
                        </Modal>
                    </div>
                    <div className="tasks-container">
                        Assigned Tasks
                        <TaskList
                            tasks={assignedTasks}
                            orgUsers={this.state.orgUsers}
                            {...this.props}
                        />
                    </div>
                    <div className="tasks-container">
                        Created for Others
                        <TaskList
                            tasks={createdTasks}
                            orgUsers={this.state.orgUsers}
                            {...this.props}
                        />
                    </div>
                </div>
            )
        }
        return <h3>Loading...</h3>
    }
}