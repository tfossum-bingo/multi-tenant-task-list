import { React, Component } from 'react'
import Modal from './modals/Modal'
import TaskForm from './TaskForm'
import '../styles/ListPage.css'

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
        const { description, summary, status, priority, assignee_id } = task
        return (
            <div className="task-card">
                <div className='task-title'>
                    {summary}
                </div >
                <div className='task-description'>
                    {description}
                </div>
                <div className="task-priority">
                    {priority}
                </div>
                <div className='task-status'>
                    {status}
                </div>
                <div className='task-assignee'>
                    {assignee_id.name}
                </div>
                <div className='task-id'>
                    {task._id}
                </div>
                <div className='task-edit'>
                    <Modal show={this.state.displayModal}>
                        <TaskForm
                            task={task}
                            orgUsers={orgUsers}
                            onClick={this.toggleModal}
                            {...this.props}
                        />
                    </Modal>
                    <button onClick={e => this.toggleModal()}>{this.modalButtonText()}</button>
                </div>

            </div>
        )
    }
}