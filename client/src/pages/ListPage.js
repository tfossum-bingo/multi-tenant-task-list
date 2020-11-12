import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import Task from '../components/Task'
import '../styles/Task.css'
import { __GetTasks } from '../services/TaskService'

export default class ViewTasks extends Component {
    constructor() {
        super()
        this.state = {
            tasks: null
        }
    }

    componentDidMount() {
        this.getTasks()
    }

    getTasks = async () => {
        
            //   const tasks = await __GetUserTasks(this.props.user_id)
            console.log('HIT getTasks')
            const tasks = await __GetTasks()
            this.setState({ tasks: tasks })
            console.log('Tasks Received: ', this.state.tasks)

    }

    render() {
        const { tasks } = this.state
        if (tasks!== null ) {
            return (
                <div class="tasks-container">
                    ListPage
                    {tasks.map((task) => {
                        return (
                            <Task task={task}></Task>
                        )
                    })
                    }
                </div>
            )
        }
        return <h3>Loading...</h3>
    }
}
