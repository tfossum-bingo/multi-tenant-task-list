import React from 'react'

export default (props) => {
    const { task } = props
    return (
        <div class="task-card">
            <div>
                <p>{task.summary}</p>
                <p>{task.description}</p>
            </div>
        </div>
    )
}