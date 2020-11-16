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

    modalButtonText() {
        const buttonTxt = this.state.displayModal == true ? "Close" : "Edit" 
        return buttonTxt
    }

    toggleModal = (e) => {
        console.log("Edit Task modal")
        this.setState({ displayModal: !this.state.displayModal })
    }

    render() {
        const { task, orgUsers } = this.props
        const {description, summary, status, priority, assignee_id} = task
        return (
            <div className="task-card">
                <div>
                    <p>{summary}</p>
                    <p>{description}</p>
                    <p>{status}</p>
                    <p>{priority}</p>
                    <p>{assignee_id.name}</p>
                </div>
                <Modal show={this.state.displayModal} onClick={this.toggleModal} >
                    Edit this Task
                    <TaskForm task={task} {...this.props} orgUsers={orgUsers}  />
                </Modal>
                
        <button onClick={e => this.toggleModal()}>{this.modalButtonText()}</button>
            </div>
        )
    }
}