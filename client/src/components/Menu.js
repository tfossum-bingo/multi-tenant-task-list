import React from 'react'
import LogOut from './LogOut'

export default (props) => {
    const { name } = props.user

    if (props.displayMenu) {
        console.log("HIT Return Menu")
        return (
            <div className='menu-pop-out'>
                <button onClick={props.onClick}>
                    X
                </button>
                <div>
                    User: {name}
                </div>
                <LogOut></LogOut>
            </div>
        )
    } else {
        return null
    }
}