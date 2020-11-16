import React from 'react'


function createOption(record) {
    return <option value={record._id}>{record.name}</option>
}

export default (props) => {
    const { orgUsers, value, onChange, name } = props
    return (
        <select value={value} onChange={onChange} name={name} >
            {orgUsers.users.map((element, index) => {
                return createOption(element)
            })}
        </select>
    )
}