import React from 'react'
import { NavLink } from 'react-router-dom'
import Board from '../Board.js'
import './Theme.css' // Tell webpack that Button.js uses these styles

export default function Theme({ boardList, ...props }) {
  const listName = 'My boards'
  const marginTopBottom = 0
  return (
    <div className="Theme">
      {boardList.map((board) => {
        console.log(board.name)
        return (
          <Board
            name={board.name}
            nStars={board.nStars}
            movies={board.posters}
            style={{ fontFamily: 'Poppins', fontSize: 20 }}
          ></Board>
        )
      })}
    </div>
  )
}
