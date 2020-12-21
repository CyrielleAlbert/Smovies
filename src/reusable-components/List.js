import React from 'react'
import { NavLink } from 'react-router-dom'

export default function List({ ...props }) {
  const listName = 'My boards'
  const marginTopBottom = 10
  return (
    <div
      style={{
        width: '95%',
        margin: 'auto',
        paddingTop: marginTopBottom,
        paddingBottom: marginTopBottom,

        backgroundColor: 'grey',
        border: 'solid',

        fontFamily: 'Poppins',

        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',

        flexWrap: 'nowrap',

        overflowX: 'auto',
      }}
    ></div>
  )
}
