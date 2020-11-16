import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import Logout from '../components/LogOut'
import CreateTaskButton from '../components/CreateTaskButton'
import Task from '../components/Task'
import TaskForm from '../components/TaskForm'
import Modal from '../components/modals/Modal'
import '../styles/Task.css'
import { __GetTasks } from '../services/TaskService'
import { __GetProfile, __Profile } from '../services/UserService'
import { __GetUsers } from '../services/OrganizationService'

export default class ViewTasks extends Component {
    constructor(props) {
        super()
        console.log("VT Props: ", props)
        this.state = {
            tasks: null,
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
        this.setState({ tasks: tasks })
        console.log('Tasks Received: ', this.state.tasks)
    }

    getOrganizationUsers = async () => {
        if(this.state.user){
            console.log("getOrg: ", this.state.user.organization_id)
            const orgUsers = await __GetUsers(this.state.user.organization_id)
            this.setState({ orgUsers: orgUsers })
            console.log("After Users: ", orgUsers)
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
        const { tasks } = this.state
        console.log('ListPage User: ', this.state.user)
        if (tasks !== null) {
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
                            Create Task
                        </button>
                    </div>
                    <div>
                        <Modal show={this.state.displayModal}
                            onClick={this.toggleModal}>
                            <TaskForm orgUsers={this.state.orgUsers} {...this.props} />
                        </Modal>
                    </div>
                    <div className="tasks-container">
                        ListPage
                    {tasks.map((task, index) => {
                        return (
                            <Task orgUsers={this.state.orgUsers} task={task} key={task._id} {...this.props}></Task>
                        )
                    })
                        }
                    </div>
                </div>
            )
        }
        return <h3>Loading...</h3>
    }
}