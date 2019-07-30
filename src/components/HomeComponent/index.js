import React, {Component} from 'react'
import { NavLink } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Map from './map'

  

const cookies = new Cookies()

class Home extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            status: false
        }
    }
    
    funcLogOut = () => {
        this.setState(cookies.set('loginStatus', false))
        this.props.history.push('/login')
        console.log('вы вышли из системы')

    }
    
    render() {
        
        return(
            
            <div> 
                
                <h1> HOME PAGE </h1> 
                
                {/* <button onClick={alert('Вы уже в системе')}> Log In </button>	 */}
                <button onClick={this.funcLogOut}> <NavLink to ='/login'> LogOut </NavLink> </button>
            </div>
        )
    }
}
 
export default Home