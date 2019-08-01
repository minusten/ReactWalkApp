import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeStateProp } from '../../actions'
import UserComponent from './index'

const mapStateToProps = ({ main: { value, firstName, lastName, email } }) => {
  return {
    value,
    firstName,
    lastName,
    email
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
const indexUserContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserComponent)

export default indexUserContainer
