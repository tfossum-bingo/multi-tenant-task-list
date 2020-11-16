import React from 'react'

export default (props) => {
    const { selectOptions, value, onChange, name } = props
    return (
        <select
            className="task-entry"
            value={value}
            onChange={onChange}
            name={name} >
            {selectOptions.map((element, index) => {
                return <option key={element[0]} value={element[0]}>{element[1]}</option>
            })}
        </select>
    )
}