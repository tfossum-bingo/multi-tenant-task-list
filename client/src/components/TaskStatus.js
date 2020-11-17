import React from 'react'

export default (props) => {
    const { status } = props
    if (status === 'Closed') {
        return (<i className="fa fa-check priority-arrow  status-closed"></i>)
    } else if (status === 'In Progress') {
        return (<i className="fa fa-car priority-arrow status-inprogress"></i>)
    } else {
        return (<i className="fa fa-bed priority-arrow status-open"></i>)
    }
}