import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Carre({ ...props }) {
  const listName = 'My boards'
  const horizontalMargin = 5
  return (
    <div
      style={{
        width: 100,
        minWidth: 100,
        height: 120,
        marginLeft: horizontalMargin,
        marginRight: horizontalMargin,

        backgroundColor: 'blue',
        border: 'solid',
      }}
    ></div>
  )
}
