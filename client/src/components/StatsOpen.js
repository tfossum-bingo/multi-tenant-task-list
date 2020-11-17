import React from 'react'

function openTasks (tasks) {
    const openTasks = tasks.filter(task => task.status === 'Open')
    return openTasks.length
}

export default (props) => {
    const { tasks, label } = props
    if (tasks) {
        return (
            <div className='task-stat'>
                {label}
                <div className='stats-open-assigned'>
                    {openTasks(tasks)}
                </div>
            </div>
        )
    } else {
        return null
    }
}