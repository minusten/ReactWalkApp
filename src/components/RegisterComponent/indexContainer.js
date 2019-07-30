import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeStateProp } from '../../actions'
import Register from './index'

const mapStateToProps = ({ main: { value, firstName, lastName, email, password } }) => {
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
    ...bindActionCreators({ changeStateProp }, dispatch),
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
