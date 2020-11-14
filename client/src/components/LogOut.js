import { Component } from 'react';
import { Redirect } from 'react-router'

class Logout extends Component {
    constructor() {
        super()
        this.state = {
            navigate: false
        }
    }

    logout = () => {
        localStorage.clear("token")
        localStorage.clear("serId")
        this.setState({ navigate: true })
    }

    render() {
        const { navigate } = this.state

        if (navigate) {
            return <Redirect to='/' push={true} />
        }

        return (
            <div className='logout-container'>
                <button onClick={this.logout}>
                    Logout*
                </button>
            </div>
        )
    }
}

export default Logout