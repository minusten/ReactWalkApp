import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeStateProp } from '../../actions'
import Register from './index'


const mapStateToProps = ({main: {value, firstName, lastName, email, password}}) => {
  return {
    value,
    firstName,
    lastName,
    email,
    password
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // bind actions with dispatch
    ...bindActionCreators({changeStateProp}, dispatch),
    // example that we can add our custom funcs to props
    myCustomPropsFunc: function (prop, value, reducer) {
      changeStateProp(prop, value, reducer)(dispatch)
      return null
    }
  }
}

const indexRegisterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Register)

export default indexRegisterContainer