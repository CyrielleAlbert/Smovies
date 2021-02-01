import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

class Home extends Component {
  constructor(props) {
    super(props)
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
        <div style={{ fontSize: 50, color: '#D40000', fontWeight: 'bolder', letterSpacing: '0.2em', paddingLeft: 15 }}>
          Smovies
        </div>
        <div style={{ color: 'white', fontSize: 50, marginTop: 200, textAlign: 'center' }}>
          Are you a fan of movies?
          <div style={{ fontSize: 30 }}>
            Smovies is for you.
            <div style={{ fontSize: 20 }}>Create & share playlist of movies with everyone.</div>
            <div style={{ fontSize: 20 }}>Get inspiration from others & discover new movies every day.</div>
          </div>
        </div>
        <div style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
          <NavLink to="/signup" style={{textDecoration: 'none', color:'white'}}>
            <div
              style={{
                backgroundColor: '#D40000',
                fontSize: 30,
                color: 'white',
                width: '20%',
                padding: 5,
                borderRadius: 93,
                textAlign: 'center',
                marginLeft: '40%',
                marginTop: 100,
              }}
            >
              Get started
            </div>
          </NavLink>
        </div>
      </div>
    )
  }
}
export default Home
