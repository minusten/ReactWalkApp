import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeStateProp } from '../../actions'
import AddRoute from './index'

const mapStateToProps = ({ main: { value } }) => {
  return {
    value
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

const indexAddRouteContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddRoute)

export default indexAddRouteContainer