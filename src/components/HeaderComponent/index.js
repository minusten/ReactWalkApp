import React, { Component } from 'react'
import Cookies from 'universal-cookie'
import './index.css'
import user from '../../assets/images/user.png'
import logout from '../../assets/images/logout.png'
import { Redirect }  from 'react-router-dom'

const cookies = new Cookies()

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            token: '',
            showMenu: false,
            redirect: '',
            active: false
        }
    }

    showMenu = (e) => {
        e.preventDefault();

        this.setState({ showMenu: true }, () => {
            document.addEventListener('click', this.closeMenu);
          });
    }
    closeMenu = () => {
        this.setState({ showMenu: false }, () => {
          document.removeEventListener('click', this.closeMenu);
        });
      }
    funcLogOut = () => {
        if (cookies.get('token')) {
            cookies.remove('token')
        }
        this.setState({
            redirect: '/login'
        })
        console.log('вы вышли из системы')
    }
    goToUser = () => {
        this.setState({
            redirect: '/user',
           
        })
        
    }
    goToRoutes = () => {
        this.setState({
            redirect: '/routes',
            active: true
        })
    }
    goToAddRoute = () => {
        this.setState({
            redirect: '/add',
            active: false
        })

    }
 
    render() {
        
        const { redirect} = this.state
        console.log(this.state.active)
        return (
            
            <div className='main-container' >
                {redirect && <Redirect to={redirect}  /> }
                <nav >
                    <ul class="navbar-nav mr-auto">
                        <div className='navbar'>
                            <div className='button-container' >
                                <li class="nav-item active" >
                                   
                                    <button onClick={this.goToRoutes}  className={this.state.active ?  'active': 'routes-button' } >Routes</button>
                                </li>
                                <li class="nav-item active">
                                    <button onClick={this.goToAddRoute} className={!this.state.active ?  'active': 'add-routes-button' } >Add route</button>
                                </li>
                            </div>
                            <div className='dropdown-container'>
                                <div className='menu-wrap'>
                                    <button onClick={this.showMenu} className='userButton'>
                                    <img src={user} alt="Logo" className='user' />
                                    </button>

                                    {
                                        this.state.showMenu
                                            ? (
                                                <div className="menu">
                                                    <button onClick={this.goToUser}>Profile</button>
                                                    <button onClick={this.funcLogOut}> <img src={logout} alt="Logo" className='profile' /> </button>                                               
                                                </div>
                                            )
                                            : (
                                                null
                                            )
                                    }
                                </div>
                            </div>
                        </div>
                    </ul>
                </nav>
                <div>

                    <div className='map-wrap'> </div>
                </div>
            </div>
        )
    }
}

export default Header