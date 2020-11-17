import React from 'react'

export default (props) => {
    const { displayNoTasks } = props

    if (displayNoTasks) {
        return (
            <div className='no-tasks-container'>
                <div className='no-tasks-inner'>
                    <div className='no-task-message'>
                        Go ahead and create a task. We dare you. ;-)
                    </div>
                </div>
            </div>
        )
    } else {
        return null
    }

}