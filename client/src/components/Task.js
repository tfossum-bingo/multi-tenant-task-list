import React from 'react'

export default (props) => {
    const { task, apple } = props
    // console.log('Apple: ', apple)
    return (
        <div className="task-card">
            <div>
                <p>{task.summary}</p>
                <p>{task.description}</p>
            </div>
        </div>
    )
}