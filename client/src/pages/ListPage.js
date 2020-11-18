import React, { Component } from 'react'

import Menu from '../components/Menu'
import Modal from '../components/modals/Modal'
import NoTasks from '../components/NoTasks'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'
import StatsOpen from '../components/StatsOpen'

import { __GetTasks } from '../services/TaskService'
import { __GetProfile } from '../services/UserService'
import { __GetUsers } from '../services/OrganizationService'

import '../styles/App.css'
import '../styles/ListPage.css'


export default class ViewTasks extends Component {
    constructor(props) {
        super()
        this.state = {
            assignedTasks: null,
            createdTasks: null,
            user: null,
            displayModal: false,
            displayMenu: false,
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

    displayNoTasks() {
        const { assignedTasks, createdTasks } = this.state
        if ((assignedTasks === null || assignedTasks.length === 0) && (createdTasks === null || createdTasks.length === 0)) {
            return true
        }
        return false
    }

    findAssignedTasks = (tasks) => {

        const assignedTasks = tasks.filter(task => task.assignee_id._id === this.state.user._id)
        return assignedTasks
    }

    findCreatedTasks = (tasks) => {
        const createdTasks = tasks.filter(task => (task.assignee_id._id !== this.state.user._id && task.creator_id === this.state.user._id))
        return createdTasks
    }

    getOrganizationUsers = async () => {
        if (this.state.user) {
            const orgUsers = await __GetUsers(this.state.user.organization_id._id)
            const selectOptions = orgUsers.users.map((user, index) => {
                return [user._id, user.name]
            })
            this.setState({ orgUsers: selectOptions })
        }
    }

    getProfile = async (userId) => {
        const fetchedProfile = await __GetProfile(userId)
        this.setState({ user: fetchedProfile.user })
        this.getOrganizationUsers()
    }

    getTasks = async () => {
        const localUserId = localStorage.getItem("userId")
        const tasks = await __GetTasks(localUserId)
        let assignedTasks = this.findAssignedTasks(tasks)
        let createdTasks = this.findCreatedTasks(tasks)

        assignedTasks = this.sortTasks(assignedTasks)
        createdTasks = this.sortTasks(createdTasks)

        this.setState({ assignedTasks: assignedTasks, createdTasks: createdTasks })
    }

    sortTasks(tasks) {
        return tasks.sort((task1, task2) => {
            switch (true) {
                case (task1.status === 'In Progress'):
                    return -1
                case (task2.status === 'In Progress'):
                    return 1
                case (task1.status === 'Open' && task2.status === 'Closed'):
                    return -1
                case (task2.status === 'Open'):
                    return -1
                default:
                    return 0
            }

        })
    }

    toggleModal = (e) => {
        this.setState({ displayModal: !this.state.displayModal })
    }

    toggleMenu = (e) => {
        this.setState({ displayMenu: !this.state.displayMenu })
    }

    render() {
        const { assignedTasks, createdTasks } = this.state
        if (assignedTasks !== null || createdTasks !== null) {
            return (
                <div className="task-page">
                    <div className="header">
                        <div className='logo-box'>
                            <h1 id='header-logo'>Traxer</h1>
                            <span className='tag-line'>
                                Task tracking, simplified
                            </span>
                        </div>
                        <div className="flex-row">
                            <div className='menu-box' onClick={this.toggleMenu} >
                                <i className="fa fa-bars priority-arrow"></i>
                            </div>
                            <Menu
                                displayMenu={this.state.displayMenu}
                                user={this.state.user}
                                onClick={this.toggleMenu} />
                        </div>
                    </div>
                    <div className="create-task">
                        <div className="create-task-button">
                            <button
                                onClick={e => this.toggleModal()} >
                                New Task
                            </button>
                            <Modal show={this.state.displayModal}
                                onClick={this.toggleModal}>
                                <TaskForm
                                    onClick={this.toggleModal}
                                    selectOptions={this.state.orgUsers}
                                    creator_id={this.state.user._id}
                                    {...this.props} />
                            </Modal>
                        </div>
                        <div className='stats-container'>
                            <StatsOpen label='My Opens:' tasks={this.state.assignedTasks} />
                            <StatsOpen label='Other Opens:' tasks={this.state.createdTasks} />
                        </div>
                    </div>
                    <div className='task-lists-container flex-row'>
                        <TaskList
                            tasks={assignedTasks}
                            sectionTitle='Assigned to Me'
                            orgUsers={this.state.orgUsers}
                            {...this.props}
                        />
                        <TaskList
                            tasks={createdTasks}
                            sectionTitle='Created for Others'
                            orgUsers={this.state.orgUsers}
                            {...this.props}
                        />
                        <NoTasks displayNoTasks={this.displayNoTasks()} />
                    </div>

                </div>
            )
        }
        return <h3>Loading...</h3>
    }
}