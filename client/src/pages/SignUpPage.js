import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import TextInput from '../components/TextInput'
import SelectOption from '../components/SelectOption'
import { __RegisterUser } from '../services/UserService'
import { __GetOrganizations } from '../services/OrganizationService'
import WelcomeHeader from '../components/WelcomeHeader'

import '../styles/App.css'

export default class Signup extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            email: '',
            password: '',
            organization_id: '',
            organizations: []
        }
    }

    componentDidMount() {

        if (this.state.organizations.length === 0) {
            this.getOrganizations()
        }
    }

    getOrganizations = async () => {
        const organizations = await __GetOrganizations()
        const selectOptions = organizations.organizations.map((element, index) => {
            return [element._id, element.name]
        })
        const tempOrgId = selectOptions[0][0]
        this.setState({ organizations: selectOptions, organization_id: tempOrgId })

    }

    handleChange = ({ target }) => {
        this.setState({ [target.name]: target.value })
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await __RegisterUser(this.state)
            this.props.history.push('/')
        } catch (error) {
            console.log(error)
        }
    }
    render() {
        const { name, password, email, organization_id } = this.state
        return (
            <div>
                <WelcomeHeader />
                <div className='sign-in-container '>
                    <div className="sign-in-form">
                        <form className="flex-column" onSubmit={this.handleSubmit}>
                            <TextInput
                                placeholder="Your Email"
                                name="email"
                                value={email}
                                type="email"
                                onChange={this.handleChange}
                            />
                            <TextInput
                                placeholder="Your Name"
                                type="text"
                                name="name"
                                value={name}
                                onChange={this.handleChange}
                            />
                            <TextInput
                                placeholder="Password"
                                type="password"
                                name="password"
                                value={password}
                                onChange={this.handleChange}
                            />
                            <SelectOption
                                selectOptions={this.state.organizations}
                                name="organization_id"
                                value={organization_id}
                                onChange={this.handleChange}
                            />
                            <button className='sign-in-up-button'>
                                Sign Up
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
