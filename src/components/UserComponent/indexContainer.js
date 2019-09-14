import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeStateProp } from '../../actions'
import UserComponent from './index'

const mapStateToProps = (state) => {
  return {
    firstName: state.main.data.firstName,
    lastName: state.main.data.lastName,
    email: state.main.data.email,
    token: state.main.data.token,
    id: state.main.data._id,
    createdBy: state.main.data.createdBy
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
