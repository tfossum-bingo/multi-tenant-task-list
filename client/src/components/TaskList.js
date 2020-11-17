import React from 'react'
import Task from '../components/Task'

export default (props) => {
    if (props.tasks.length > 0) {
        return (
            <div className="tasks-container">
                <h4>{props.sectionTitle}</h4>
                {props.tasks.map((task, index) => {
                    return (
                        <Task
                            selectOptions={props.orgUsers}
                            task={task}
                            key={task._id}
                            {...props}>
                        </Task>
                    )
                })
                }
            </div>
        )
    }
    return null
}