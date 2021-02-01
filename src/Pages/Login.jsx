import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { signin, sendPasswordReset } from '../helpers/auth.js'
import { updateUser } from '../helpers/database.js'
import { auth } from '../services/firebase.js'
import Modal from 'react-modal'


function utcTimestampToDateString(timestamp) {
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
      resetEmailSent: false,
      isModalOpen: false,
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
      await updateUser({ lastConnection: utcTimestampToDateString(Date.now()) })
    } catch (error) {
      this.setState({ error: error.message })
    }
  }
  closeModal = () => {
    this.setState({ isModalOpen: false })
  }
  resetPassword = (email) => {
    sendPasswordReset(email, () => {
      this.setState({ resetEmailSent: true })
      //setTimeout(() => { this.setState({ resetEmailSent: false }), 20000 })
    },
      (error) => { console.log(error) }
    )
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
        <Modal
          isOpen={this.state.isModalOpen}
          onRequestClose={this.closeModal}
          style={{
            overlay: { backgroundColor: 'rgba(65, 65, 65, 0.01)', backdropFilter: 'blur(10px)', },
            content: {
              left: null,
              top: 90,
              right: null,
              bottom: null,
              width: "50%",
              marginLeft: '25%',
              backgroundColor: '#DADADA',
              boxShadow: '0px 0px 45px 25px rgba(0, 0, 0, 0.25)',
              borderWidth: 0,
              borderRadius: 24,
            },
          }}
        >
          <div
            style={{
              fontFamily: 'Poppins',
              color: 'white',
              textAlign: 'center',
              padding: 25,

            }}
          >
            <div style={{ fontSize: 32, color: "black", textAlign: 'center', fontWeight: "bolder" }}>Reset Password</div>
            <div style={{ fontSize: 16, color: "black", textAlign: 'center', marginTop: 25 }}>Enter the email address associated with your account.</div>
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
                placeholder="Email"
                name="email"
                type="email"
                onChange={this.handleChange}
                value={this.state.email}
              ></input>
            </div>
            {!this.state.resetEmailSent &&
              <div
                onClick={() => {
                  if (this.state.email != null) {
                    this.resetPassword(this.state.email)
                  } else {
                    console.log("email null")
                  }
                }}
                style={{
                  width: '50%',
                  marginLeft: '25%',
                  backgroundColor: '#D40000',
                  fontSize: 20,
                  borderWidth: 0,
                  borderRadius: 24,
                  padding: 5,
                  marginTop: 50,
                  marginBottom: 50,
                  color: 'white',
                  boxShadow: '0px 0px 10px grey',
                }}
              >
                Reset password
                    </div>}
            {this.state.resetEmailSent &&
              <div style={{
                color: 'black',
                fontSize: 15,
                marginTop: 25,
              }}>An email has been sent to your email address.</div>}
            <div style={{ color: "black", textDecoration: "black underline" }} onClick={this.closeModal}>← Back to login</div>
          </div>

        </Modal>
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
              <div style={{ textDecoration: "black underline", marginTop:25 }} onClick={() => { this.setState({ isModalOpen: true }) }}>Forgot password?</div>
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
