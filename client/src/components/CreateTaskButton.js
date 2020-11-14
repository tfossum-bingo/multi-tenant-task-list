import React from 'react'

export default (props) => {
    const { task, apple } = props
    return (
        <div className="createTaskButton">
            <button>
                Create Task
            </button>
        </div>
    )
}