import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { signup } from '../helpers/auth';

export default class SignUp extends Component {

  constructor() {
    super();
    this.state = {
      error: null,
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ error: '' });
    try {
      await signup(this.state.email, this.state.password);
    } catch (error) {
      this.setState({ error: error.message });
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
            textAlign:"center"
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
              <h1>Register</h1>
              <p>Fill in the form below to create your account.</p>
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
                  Sign out
                </button>
              </div>
              <p>
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
