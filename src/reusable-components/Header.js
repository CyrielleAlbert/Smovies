import React from 'react'
import { NavLink } from 'react-router-dom'
import { logout } from './../helpers/auth.js'

export default function Header({ ...props }) {
  const userId = '@Cyrialkiller'
  const pictureLink = '/cyriProfilePic.jpg'
  return (
    <div
      style={{
        backgroundColor: 'white',
        width: '100%',
        height: 75,
        fontFamily: 'Poppins',
        display: 'flex',
        flexDirection: 'row',
        position: 'fixed',
        zIndex: 5,
      }}
    >
      <div
        style={{
          width: '20%',
          height: '100%',
          color: '#D40000',
          fontSize: 30,
          fontWeight: 'bolder',
          letterSpacing: '0.2em',
          alignItems: 'center',
          paddingTop: 15,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <NavLink to="/feed" style={{ textDecoration: 'none', color: '#D40000' }}>
          <div>Smovies</div>
        </NavLink>
      </div>
      <div
        style={{
          width: '20%',
          height: '100%',
          color: '#414141',
          fontSize: 20,
          fontWeight: 'bolder',
          letterSpacing: '0.2em',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
        }}
      >
        <NavLink to="/Discovery" style={{ textDecoration: 'none', color: '#414141' }}>
          Discovery
        </NavLink>
      </div>
      <div
        style={{
          width: '20%',
          height: '100%',
          color: '#414141',
          fontSize: 20,
          fontWeight: 'bolder',
          letterSpacing: '0.2em',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
        }}
      >
        <NavLink to="/MyBoards" style={{ textDecoration: 'none', color: '#414141' }}>
          My Boards
        </NavLink>
      </div>
      {/* <div
        style={{
          width: '20%',
          height: '100%',
          color: '#414141',
          fontSize: 20,
          fontWeight: 'bolder',
          letterSpacing: '0.2em',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',

        }}
      >
        <NavLink to="/MyAccount" style={{ textDecoration: 'none', color: '#414141' }}>
          My Account
        </NavLink>
      </div> */}
      <div style={{ width: '20%', height: '100%', verticalAlign: 'center', marginLeft: '20%' }}>
        <div
          style={{
            margin: 15,
            marginLeft: '50%',
            width: '40%',
            padding: 5,
            backgroundColor: '#D40000',
            color: 'white',
            fontSize: 15,
            textAlign: 'center',
            borderRadius: 93,
          }}
          onClick={logout}
        >
          Log out
        </div>
      </div>
    </div>
  )
}
