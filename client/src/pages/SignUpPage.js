import React, { Component } from 'react'
import TextInput from '../components/TextInput'
import { __RegisterUser } from '../services/UserServices'
import { __GetOrganizations } from '../services/OrganizationService'

export default class Signup extends Component {
    // TODO Integrate Auth
    constructor() {
        super()
        this.state = {
            name: '',
            email: '',
            password: '',
            organization_id,
            organizations: []
        }
    }

    componentDidMount() {
        if (this.state.orgUsers === []) {
            this.getOrganizations()
        }
    }

    getOrganizations = async () => {
        const organizations = await __GetOrganizations().organizations
        const selectOptions = organizations.map((element, index) => {
            return [element._id, element.name]
        })

        this.setState({ organization: selectOptions })
    }

    handleChange = ({ target }) => {
        this.setState({ [target.name]: target.value })
        console.log(this.state)
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await __RegisterUser(this.state)
            this.props.history.push('/login')
        } catch (error) {
            console.log(error)
        }
    }
    render() {
        const { name, password, email } = this.state
        return (
            <div className="signup flex-col">
                <form className="flex-col" onSubmit={this.handleSubmit}>
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
                    <div>
                        <SelectOption
                            selectOptions={this.state.organizations}
                            name="organization_id"
                            value={organization_id}
                            onChange={this.handleChange}
                        />
                    </div>
                    <button>Sign Up</button>
                </form>
            </div>
        )
    }
}
