import React from 'react'
import { NavLink } from 'react-router-dom'

export default function List({ ...props }) {
  const listName = 'My boards'
  const listHeight = 200
  const userId = '@Cyrialkiller'
  const pictureLink = '/cyriProfilePic.jpg'
  return (
    <div
      style={{
        backgroundColor: 'grey',
        width: '95%',
        height: listHeight,
        fontFamily: 'Poppins',
        display: 'flex',
        flexDirection: 'row',
	justifyContent: 'center', 
      }}
    >
      <div
        style={{
          width: '20%',
          height: '50%',
          color: '#D40000',
          fontSize: 20,
          fontWeight: 'bolder',
          letterSpacing: '0.2em',
          alignItems: 'center',
          paddingTop: 0,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div>{listName}</div>
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
      <div
        style={{
          width: '40%',
          height: '100%',
          color: '#414141',
          fontSize: 15,
          fontWeight: 'normal',
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        {userId}
        <img
          src={pictureLink}
          width={50}
          height={'auto'}
          style={{ borderRadius: 30, border: '2px solid #D40000', marginLeft: '5%' }}
        />
      </div>
    </div>
  )
}
