import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { signin } from '../helpers/auth.js'
import { updateUser } from '../helpers/database.js'
import { auth } from '../services/firebase.js'

function utcTimestampToDateString(timestamp){
  try {
    // Convert to date object.
    const date = new Date(Number(timestamp));
    // Test date is valid.
    if (!isNaN(date.getTime())) {
      // Convert to UTC date string.
      return date.toUTCString();
    }
  } catch (e) {
    // Do nothing. undefined will be returned.
  }
  return undefined;
}

export default class Login extends Component {
  constructor() {
    super()
    this.state = {
      error: null,
      email: '',
      password: '',
      loading: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.user = auth().currentUser
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  async handleSubmit(event) {
    this.setState({ loading: true })
    event.preventDefault()
    this.setState({ error: '' })
    try {
      await signin(this.state.email, this.state.password)
      await updateUser({lastConnection:utcTimestampToDateString(Date.now())})
    } catch (error) {
      this.setState({ error: error.message })
    }
  }

  render() {
    return (
      <div
        style={{
          backgroundColor: '#414141',
          height: window.innerHeight,
          position: 'relative',
          width: '100%',
          fontFamily: 'Poppins',
          backgroundImage: 'url(' + '/cinema.jpg' + ')',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div
          style={{
            color: '#D40000',
            fontSize: 50,
            fontWeight: 'bolder',
            letterSpacing: '0.2em',
            alignItems: 'center',
            paddingTop: 15,
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
          }}
        >
          Smovies
        </div>
        <div
          style={{
            backgroundColor: '#DADADA',
            width: '50%',
            marginLeft: '25%',
            padding: 25,
            textAlign: 'center',
            borderRadius: 24,
          }}
        >
          <div>
            <form autoComplete="off" onSubmit={this.handleSubmit}>
              <h1>Login</h1>
              <p>Fill in the form below to login to your account.</p>
              <div>
                <input
                  style={{
                    width: '75%',
                    backgroundColor: 'white',
                    color: 'black',
                    fontFamily: 'Poppins',
                    borderWidth: 0,
                    borderRadius: 24,
                    outline: 'none',
                    padding: 15,
                  }}
                  placeholder="Email"
                  name="email"
                  type="email"
                  onChange={this.handleChange}
                  value={this.state.email}
                ></input>
              </div>
              <div>
                <input
                  style={{
                    marginTop: 25,
                    width: '75%',
                    backgroundColor: 'white',
                    color: 'black',
                    fontFamily: 'Poppins',
                    borderWidth: 0,
                    borderRadius: 24,
                    outline: 'none',
                    padding: 15,
                  }}
                  placeholder="Password"
                  name="password"
                  onChange={this.handleChange}
                  value={this.state.password}
                  type="password"
                ></input>
              </div>
              <div>
                {this.state.error ? <p>{this.state.error}</p> : null}
                {this.state.loading ? (
                  <div marginTop={25}>Loading...</div>
                ) : (
                  <button
                    style={{
                      width: '20%',
                      backgroundColor: '#D40000',
                      fontSize: 30,
                      borderWidth: 0,
                      borderRadius: 24,
                      padding: 5,
                      marginTop: 25,
                      marginBottom: 50,
                      color: 'white',
                      boxShadow: '0px 0px 10px grey',
                    }}
                  >
                    Log in
                  </button>
                )}
              </div>
              <p>
                Don't have an account? <Link to="/signup">Register</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
