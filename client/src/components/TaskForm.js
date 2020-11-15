import React, { Component } from 'react'
import '../styles/index.css'
import TextInput from './TextInput'
import { __CreateTask } from '../services/TaskService'

export default class TaskForm extends Component {
    constructor(props) {
        super()
        console.log("TaskForm Props: ", props)
        this.state = {
            summary: '',
            description: '',
            status: '',
            priority: '',
            assignee_id: '',
            creator_id: ''
        }
    }

    handleChange = ({ target }) => {
        this.setState({ [target.name]: target.value })
        console.log(this.state)
      }

    handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await __CreateTask(this.state)
            this.props.history.push('/list')
        } catch (error) {
            console.log(error)
        }
    }

    componentDidMount() {
        // const localStorabeUserID = localStorage.getItem("userId")
        // if (localStorabeUserID) {
        //     this.setState({ user: localStorabeUserID })
        // } else {
        //     this.setState({ user: this.props.user._id })
        // }
        // this.getTasks()
    }

    getOrganizationUsers = async () => {
        // console.log('HIT getOrganizationUsers')
        // const user_id = localStorage.getItem("userId")

        // const tasks = await __GetOrganizationUsers(user_id)
        // this.setState({ tasks: tasks })
        // console.log('Tasks Received: ', this.state.tasks)
    }

    render() {
        const { summary, description, status, priority, assignee_id, creator_id } = this.state
        return (
            <div className="flex-column">
                <form onSubmit={this.handleSubmit}>
                    <TextInput
                        placeholder="Summary"
                        name="summary"
                        value={summary}
                        type="text"
                        onChange={this.handleChange}
                    />
                    <TextInput
                        placeholder="Description"
                        name="description"
                        value={description}
                        type="text"
                        onChange={this.handleChange}
                    />
                    <TextInput
                        placeholder="Status"
                        name="status"
                        type="text"
                        value={status}
                        onChange={this.handleChange}
                    />
                    <TextInput
                        placeholder="Priority"
                        name="priority"
                        type="text"
                        value={priority}
                        onChange={this.handleChange}
                    />
                    <TextInput
                        placeholder="Assignee"
                        name="assignee_id"
                        type="text"
                        value={assignee_id}
                        onChange={this.handleChange}
                    />
                    <TextInput
                        placeholder="Creator"
                        name="creator_id"
                        type="text"
                        value={creator_id}
                        onChange={this.handleChange}
                    />
                    <button>Create Task</button>
                </form>
            </div>
        )
    }
}
