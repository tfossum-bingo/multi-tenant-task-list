import React, { Component } from 'react'
import TextInput from '../components/TextInput'
import { __LoginUser } from '../services/UserService'

export default class SignIn extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      formError: false
    }
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value, formError: false })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const loginData = await __LoginUser(this.state)
      console.log('loginData: ', loginData.user)
      this.props.toggleAuthenticated(true, loginData.user, () => this.props.history.push('/list')
      )
    }catch (error) {
      this.setState({formError: true})
    }
  }

  render() {
    const { email, password } = this.state
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <TextInput
            placeholder="Email"
            name="email"
            type="email"
            value={email}
            onChange={this.handleChange}
          />
          <TextInput
            placeholder="Password"
            name="password"
            type="password"
            value={password}
            onChange={this.handleChange}
          />
          <button>Sign In</button>
          {this.state.formError ? <p>Login Error</p> : <p></p>}
        </form>
      </div>
    )
  }
}
