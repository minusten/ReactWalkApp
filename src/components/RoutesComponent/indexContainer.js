import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeStateProp } from '../../actions'
import Routes from './index'

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

const indexRoutesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Routes)

export default indexRoutesContainer