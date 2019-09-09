import React, { Component } from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import './LoginRoute.css'

class LoginRoute extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => { },
    },
  }

  handleLoginSuccess = () => {
    const { location, history } = this.props
    const destination = (location.state || {}).from || '/'
    history.push(destination)
  }

  render() {
    return (
      <section>
        <div className='login-title-container'>
        <h2>Login</h2>
        </div>
        <LoginForm
          onLoginSuccess={this.handleLoginSuccess}
        />
      </section>
    );
  }
}

export default LoginRoute
