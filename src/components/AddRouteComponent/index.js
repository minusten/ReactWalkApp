import React, { Component } from 'react'

class AddRoute extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: ''
        }
    }
    goToHome = () => {
        this.props.history.push('/')
    }

    render() {
        return(
            <div> 
                <button onClick={this.goToHome}> Return </button>
            </div>
        )
    }
}

export default AddRoute