import React, { Component } from 'react'
import '../styles/index.css'
import TextInput from './TextInput'
import { __CreateTask, __UpdateTask } from '../services/TaskService'

export default class TaskForm extends Component {
    constructor(props) {
        super()
        console.log("TaskForm Props: ", props)
        this.state = {
            _id: '',
            summary: '',
            description: '',
            status: '',
            priority: '',
            assignee_id: '',
            creator_id: ''
        }

    }

    createButton() {
        return (
            <button>Create</button>
        )
    }

    handleChange = ({ target }) => {
        this.setState({ [target.name]: target.value })
        console.log(this.state)
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        const newValues = {
            summary: this.state.summary,
            description: this.state.description,
            status: this.state.status,
            priority: this.state.priority,
            assignee_id: this.state.assignee_id,
            creator_id: this.state.creator_id
        }
        try {
            if (this.state._id == '') {
                await __CreateTask(newValues)
            } else {
                await __UpdateTask(this.state._id, newValues)
            }
            this.props.history.push('/list')
        } catch (error) {
            console.log(error)
        }
    }

    componentDidMount() {
        this.setStateFromProps(this.props)
    }

    getOrganizationUsers = async () => {
    }

    saveButton() {
        return (
            <button>Save</button>
        )
    }

    setStateFromProps(props) {
        if (props.task) {
            const { _id, summary, description, status, priority, assignee_id, creator_id } = props.task
            this.setState({ _id: _id, summary: summary, description: description, status: status, priority: priority, assignee_id: assignee_id, creator_id: creator_id })
            console.log("Loaded Task state: ", props.task)
        }
    }

    render() {
        const { summary, description, status, priority, assignee_id, creator_id } = this.state
        return (
            <div className="flex-column modal">
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <TextInput
                            placeholder="Summary"
                            name="summary"
                            value={summary}
                            type="text"
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <TextInput
                            placeholder="Description"
                            name="description"
                            value={description}
                            type="text"
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <TextInput
                            placeholder="Status"
                            name="status"
                            type="text"
                            value={status}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <TextInput
                            placeholder="Priority"
                            name="priority"
                            type="text"
                            value={priority}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <TextInput
                            placeholder="Assignee"
                            name="assignee_id"
                            type="text"
                            value={assignee_id}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <TextInput
                            placeholder="Creator"
                            name="creator_id"
                            type="text"
                            value={creator_id}
                            onChange={this.handleChange}
                        />
                    </div>
                    {this.state._id == '' ? this.createButton() : this.saveButton()}
                </form>
            </div>
        )
    }
}
