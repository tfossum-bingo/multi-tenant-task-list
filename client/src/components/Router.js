import React, { Component } from 'react'
import {Switch, Route} from 'react-router-dom'
import Nav from './Nav'

class Router extends Component {
    constructor() {
        super()
        this.state = {
            pageLoading: true
        }
    }
    
    componentDidMount() {
        console.log('***HIT componentDidMount')
    }

    render() {
        return (
            <main>
                {this.state.pageLoading} ? (
                    <div>
                        <h3>Loading...</h3>
                    </div>
                ) : (
                    <div>
                        <h3>Page has loaded</h3>
                    </div>
                )
            </main>
        )
    }
}

export default Router