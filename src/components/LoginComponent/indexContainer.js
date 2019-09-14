import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeStateProp } from '../../actions'
import Login from './index'

const mapStateToProps = ({ main: { value, email, password, _id } }) => {
  return {
    value,
    email,
    password,
    _id
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

const indexLoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)

export default indexLoginContainer
