import React from 'react'

export default (props) => {
    const { status } = props
    if (status === 'Closed') {
        return (<i class="fa fa-bed priority-arrow status-open"></i>)
    } else if (status === 'In Progress') {
        return (<i class="fa fa-car priority-arrow status-inprogress"></i>)
    } else {
        return (<i class="fa fa-check priority-arrow  status-closed"></i>)
    }
}