import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import ListPage from '../pages/ListPage'
import { __CheckSession } from '../services/UserService'


class Router extends Component {
  constructor() {
    super()
    this.state = {
      pageLoading: true
    }
  }

  componentDidMount() {
    this.setState({ pageLoading: false })
    this.checkLoggedIn()
  }

  async checkLoggedIn () {
    const token = localStorage.getItem("token")
    if(token){
      const session = await __CheckSession()
      console.log("My session: ", session)
      if(session){
        this.props.history.push('/list')
      }
    }
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
                      <Route exact path="/" component={() => (
                          <LandingPage></LandingPage>
                      )}/>
                      <Route path="/list" component={() => (<ListPage />)}/>
                  </Switch>
                  )}
          </main>
      )
  }
}
export default withRouter(Router)