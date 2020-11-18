import React, { Component } from 'react'
import SelectOption from './SelectOption'
import TextInput from './TextInput'
import { __CreateTask, __DeleteTask, __UpdateTask } from '../services/TaskService'

import '../styles/index.css'

export default class TaskForm extends Component {
    constructor(props) {
        super()

        this.state = {
            _id: '',
            summary: '',
            description: '',
            status: '',
            priority: '',
            assignee_id: '',
            creator_id: '',
            orgUsers: [],
            priorities: [['Low', 'Low'], ['Medium', 'Medium'], ['High', 'High']],
            statuses: [['Open', 'Open'], ['Closed', 'Closed'], ['In Progress', 'In Progress']]
        }
    }

    createButton() {
        return (
            <button>Create Task</button>
        )
    }

    componentDidMount() {
        this.setStateFromProps(this.props)
    }

    handleChange = ({ target }) => {
        this.setState({ [target.name]: target.value })
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

    saveButton() {
        return (
            <button>Save</button>
        )
    }

    setStateFromProps(props) {
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
            const tempAssigneeId = props.selectOptions[0][0]
            this.setState({ assignee_id: tempAssigneeId, status: 'Open', priority: 'Medium' })
        }
    }

    render() {
        const { summary, description, status, priority, assignee_id, creator_id } = this.state
        return (
            <div>
                <div className='modal-header'>
                    <div className='modal-title'>
                    </div>
                    <div className='model-close'>
                        <button
                            className='modal-close-button'
                            onClick={this.props.onClick}>
                            X
                        </button>
                    </div>
                </div>
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
                        <SelectOption
                            selectOptions={this.state.statuses}
                            name="status"
                            value={status}
                            onChange={this.handleChange}
                        />
                        <SelectOption
                            selectOptions={this.state.priorities}
                            name="priority"
                            value={priority}
                            onChange={this.handleChange}
                        />
                        <SelectOption
                            selectOptions={this.props.selectOptions}
                            name="assignee_id"
                            value={assignee_id}
                            onChange={this.handleChange}
                        />
                        <input
                            name="creator_id"
                            type="hidden"
                            value={creator_id}
                        />

                        {this.state._id === '' ? this.createButton() : this.saveButton()}
                    </form>
                    <div className="modal-footer">
                        <button
                            className='delete-button'
                            onClick={this.handleDelete}>
                            Delete
                    </button>
                    </div>

                </div>
            </div>
        )
    }
}
