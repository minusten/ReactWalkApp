import React, {Component} from 'react'
import MaterialUiForm from './MyForm';

class ChildForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: ''

        }
    }

    onChangeTextField = (e) => {
        this.setState({
            firstName: e.target.value,
            lastName: e.target.value,
            email: e.target.value,
            password: e.target.value

        })
    }
    render() {
        return(
            <MaterialUiForm
            onChangeTextField={this.onChangeTextField}
            firstName={this.state.firstName}
            />
        )
    }
}

export default ChildForm