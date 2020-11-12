import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'


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
          <div>
              Here is some text
          </div>
      )
  }
}
export default Router