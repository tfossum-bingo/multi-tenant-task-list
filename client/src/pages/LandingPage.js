import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import TextInput from '../components/TextInput'
import { __LoginUser } from '../services/UserService'
import WelcomeHeader from '../components/WelcomeHeader'

import '../styles/App.css'
import '../styles/LandingPage.css'
import '../styles/ListPage.css'


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
      this.props.toggleAuthenticated(true, loginData.user, () => this.props.history.push('/list')
      )
    } catch (error) {
      this.setState({ formError: true })
    }
  }

  render() {
    const { email, password } = this.state
    return (
      <div>
        <WelcomeHeader/>
        <div className="sign-in-container">
          <div className='sign-in-form'>
            <form className="flex-column sign-in-form" onSubmit={this.handleSubmit}>
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
              <button className='sign-in-up-button'>
                Sign In
              </button>
              {this.state.formError ? <p className='login-error'>Login Error</p> : null}
            </form>
          </div>
          <div className='sign-up-link-container'>
            <NavLink to="/signup">
              Sign Up
          </NavLink>
          </div>
        </div>
      </div>
    )
  }
}
