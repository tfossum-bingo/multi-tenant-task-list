import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import ListPage from '../pages/ListPage'


class Router extends Component {
  constructor() {
    super()
    this.state = {
      pageLoading: true
    }
  }

  componentDidMount() {
    this.setState({ pageLoading: false })
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
export default Router