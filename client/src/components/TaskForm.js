import React, { Component } from 'react'
import '../styles/index.css'
import SelectOption from './SelectOption'
import TextInput from './TextInput'

import { __CreateTask, __DeleteTask, __UpdateTask } from '../services/TaskService'

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
            creator_id: '',
            orgUsers: []
        }
    }

    createButton() {
        return (
            <button>Create Task</button>
        )
    }

    handleChange = ({ target }) => {
        this.setState({ [target.name]: target.value })
        console.log(this.state)
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        console.log("Form State: ", this.props)
        const newValues = {
            summary: this.state.summary,
            description: this.state.description,
            status: this.state.status,
            priority: this.state.priority,
            assignee_id: this.state.assignee_id,
            creator_id: this.state.creator_id
        }
        if (newValues.creator_id === "") {
            newValues.creator_id = this.props.creator_id
        }

        try {
            if (this.state._id === '') {
                await __CreateTask(newValues)
            } else {
                await __UpdateTask(this.state._id, newValues)
            }
            this.props.history.push('/list')
        } catch (error) {
            console.log(error)
        }
    }

    handleDelete = async (e) => {
        e.preventDefault()
        try {
            await __DeleteTask(this.state._id)
            this.props.history.push('/list')
        } catch (error) {
            console.log(error)
        }
    }

    componentDidMount() {
        console.log("TaskForm didMount")
        this.setStateFromProps(this.props)
    }

    saveButton() {
        return (
            <button>Save</button>
        )
    }

    setStateFromProps(props) {
        console.log("TaskForm setStateFromProps")
        if (props.task) {
            const { _id, summary, description, status, priority, assignee_id, creator_id } = props.task

            this.setState({
                _id: _id,
                summary: summary,
                description: description,
                status: status,
                priority: priority,
                assignee_id: assignee_id,
                creator_id: creator_id
            })
        } else {
            console.log("Assignee is empty")
            this.setState({assignee_id: props.selectOptions[0][0]})
            console.log("Assignee is now: ", this.state.assignee_id)
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
                        <SelectOption
                            selectOptions={this.props.selectOptions}
                            name="assignee_id"
                            value={assignee_id}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <input
                            name="creator_id"
                            type="hidden"
                            value={creator_id}
                        />
                    </div>
                    {this.state._id == '' ? this.createButton() : this.saveButton()}
                </form>
                <button onClick={this.handleDelete}>Delete</button>
            </div>
        )
    }
}
