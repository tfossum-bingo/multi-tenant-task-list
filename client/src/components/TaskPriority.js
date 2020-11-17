import React from 'react'

export default (props) => {
    const { priority } = props
    switch (priority) {
        case 'High':
            return (<i class="fa fa-arrow-up priority-arrow priority-high"></i>)
            break;
        case 'Medium':
            return (<i class="fa fa-arrow-right priority-arrow priority-medium"></i>)
            break;
        case 'Low':
            return (<i class="fa fa-arrow-down priority-arrow  priority-low"></i>)
    }
}