import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeStateProp } from '../../actions'
import Login from './index'


const mapStateToProps = ({main: {value}}) => {
  return {
    value
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // bind actions with dispatch
    ...bindActionCreators({changeStateProp}, dispatch),
    // example that we can add our custom funcs to props
    myCustomPropsFunc: function (prop, value, reducer) {
      // call of action in custom func
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