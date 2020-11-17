import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import TextInput from '../components/TextInput'
import { __CreateOrganization } from '../services/OrganizationService'
import WelcomeHeader from '../components/WelcomeHeader'

import '../styles/App.css'

export default class Signup extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            website_url: ''
        }
    }

    componentDidMount() {
    }

    handleChange = ({ target }) => {
        this.setState({ [target.name]: target.value })
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await __CreateOrganization(this.state)
            this.props.history.push('/')
        } catch (error) {
            console.log(error)
        }
    }
    render() {
        const { name, website_url } = this.state
        return (
            <div>
                <WelcomeHeader />
                <div className='sign-in-container '>
                    <div className="sign-in-form">
                        <form className="flex-column" onSubmit={this.handleSubmit}>
                            <TextInput
                                placeholder="Organization Name"
                                type="text"
                                name="name"
                                value={name}
                                onChange={this.handleChange}
                            />
                            <TextInput
                                placeholder="Website URL"
                                type="text"
                                name="website_url"
                                value={website_url}
                                onChange={this.handleChange}
                            />
                            <button className='sign-in-up-button'>
                                Save
                            </button>
                            {this.state.formError ? <p>Login Error</p> : <p></p>}
                        </form>
                    </div>
                    <div className='sign-up-link-container'>
                        <NavLink to="/">
                            Return to Sign-In
                    </NavLink>
                    </div>
                </div>
            </div>
        )
    }
}
