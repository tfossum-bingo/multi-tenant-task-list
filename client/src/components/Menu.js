import React from 'react'
import LogOut from './LogOut'

export default (props) => {
    const { name, email, organization_id } = props.user

    if (props.displayMenu) {
        return (
            <div className='menu-pop-out modal-styles'>
                <div>
                    <button
                        className='modal-close-button'
                        onClick={props.onClick}>
                        X
                    </button>
                </div>
                <div>
                    user: {name}
                </div>
                <div>
                    email: {email}
                </div>
                <div>
                    org: {organization_id.name} 
                </div>
                <div className='menu-logout'>
                    <LogOut></LogOut>
                </div>
            </div>
        )
    } else {
        return null
    }
}