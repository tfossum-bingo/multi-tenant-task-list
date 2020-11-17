import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'

import LandingPage from '../pages/LandingPage'
import ListPage from '../pages/ListPage'
import SignUpPage from '../pages/SignUpPage'
import OrganizationPage from '../pages/OrganizationPage'
import ProtectedRoute from './ProtectedRoute'

import { __CheckSession } from '../services/UserService'

class Router extends Component {
  constructor() {
    super()
    this.state = {
      pageLoading: true,
      user: null
    }
  }

  componentDidMount() {
    this.setState({ pageLoading: false })
    this.checkLoggedIn()
  }

  async checkLoggedIn() {
    const token = localStorage.getItem("token")
    if (token) {
      const session = await __CheckSession()
      if (session) {
        this.props.history.push('/list')
      }
    }
  }

  toggleAuthenticated = (value, user, done) => {
    this.setState({
      authenticated: value,
      user: user
    }, () => done())
  }

  render() {
    return (
      <main>
        {this.state.pageLoading ? (
          <div>
            <h3>Loading...</h3>
          </div>
        ) : (
            <Switch>
              <Route exact path="/" component={(props) => (
                <LandingPage toggleAuthenticated={this.toggleAuthenticated}
                  {...props}>
                </LandingPage>
              )} />
              <Route path="/signup" component={(props) => (
                <SignUpPage {...props} />
              )} />
              <Route path="/organization_admin" component={(props) => (
                <OrganizationPage {...props} />
              )} />
              <ProtectedRoute
                authenticated={this.state.authenticated}
                path="/list"
                component={(props) => (
                  <ListPage user={this.state.user} {...props} />
                )} />
            </Switch>
          )}
      </main>
    )
  }
}
export default withRouter(Router)