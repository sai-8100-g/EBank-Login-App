import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    userId: '',
    pin: '',
    error: '',
  }

  verifyingTheUser = async event => {
    const {userId, pin} = this.state

    event.preventDefault()
    const userDetails = {
      user_id: userId,
      pin,
    }
    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const {history} = this.props
      Cookies.set('jwt_token', data.jwt_token, {expires: 2})
      history.replace('/')
    } else {
      this.setState({error: data.error_msg})
    }
  }

  onChangeUserId = event => {
    this.setState({userId: event.target.value})
  }

  onChangePin = event => {
    this.setState({pin: event.target.value})
  }

  render() {
    const {error} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-main-container">
        <div className="inner-login-container">
          <div className="imageContainer">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png "
              alt="website login"
            />
          </div>
          <form className="loginFormContainer" onSubmit={this.verifyingTheUser}>
            <h1>Welcome Back!</h1>
            <label htmlFor="userId">USER ID</label>
            <input
              id="userId"
              placeholder="Enter Your user Id"
              type="text"
              onChange={this.onChangeUserId}
            />
            <label htmlFor="pin">PIN</label>
            <input
              id="pin"
              type="password"
              onChange={this.onChangePin}
              placeholder="Enter Your PIN"
            />
            <button type="submit">Login</button>
            {error && <p className="error">*{error}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
