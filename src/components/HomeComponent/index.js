import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Cookies from 'universal-cookie'
import './index.css'
import user from '../../assets/images/user.png'
import logout from '../../assets/images/logout.png'


const cookies = new Cookies()

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            token: '',
            showMenu: false
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
        this.props.history.push('/login')
        console.log('вы вышли из системы')
    }
    goToUser = () => {
        this.props.history.push('/user')
    }
    goToRoutes = () => {
        this.props.history.push('/routes')
    }
    goToAddRoute = () => {
        this.props.history.push('/add')
    }
    render() {

        return (
            <div className='main-container' >
                <nav >
                    <ul class="navbar-nav mr-auto">
                        <div className='navbar'>
                            <div className='button-container'>
                                <li class="nav-item active">
                                    <button onClick={this.goToRoutes} className='routes-button'>Routes</button>
                                </li>
                                <li class="nav-item active">
                                    <button onClick={this.goToAddRoute} className='add-routes-button'>Add route</button>
                                </li>
                            </div>
                            <div className='dropdown-container'>
                                <div className='menu-wrap'>
                                    <button onClick={this.showMenu} class='userButton'>
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

export default Home