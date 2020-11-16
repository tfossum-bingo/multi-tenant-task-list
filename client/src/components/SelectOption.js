import React from 'react'

export default (props) => {
    const { orgUsers, value, onChange, name } = props
    return (
        <select value={value} onChange={onChange} name={name} >
            {orgUsers.users.map((element, index) => {
                return <option key={element._id} value={element._id}>{element.name}</option>
            })}
        </select>
    )
}