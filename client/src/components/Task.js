import { React, Component } from 'react'
import Modal from './modals/Modal'
import TaskForm from './TaskForm'

export default class Task extends Component {
    constructor(props) {
        super()
        this.state = {
            displayModal: false
        }
    }

    showModal() {
        console.log("Edit Task modal")
        this.setState({ displayModal: true })
    }

    render() {
        const { task } = this.props
        // console.log('Apple: ', apple)
        return (
            <div className="task-card">
                <div>
                    <p>{task.summary}</p>
                    <p>{task.description}</p>
                </div>
                <Modal show={this.state.displayModal}>
                    Edit this Task
                    <TaskForm task={task} {...this.props} />
                </Modal>
                <button onClick={e => this.showModal()}>Edit</button>
            </div>
        )
    }
}