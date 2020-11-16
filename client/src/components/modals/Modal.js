import React from "react";
import Task from "../Task";
import TaskForm from '../TaskForm'
import './Modal.css'

export default class Modal extends React.Component {



    render() {
        if (!this.props.show) {
            return null
        }
        return (
            <div className='modal-layer'>
                <div className="modal">
                    {this.props.children}
                </div>
            </div>
        )
    }
}