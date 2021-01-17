import React, { Component } from 'react'
import { getUserBoards } from '../helpers/database.js'
import Header from './../reusable-components/Header.js'
import Board from './../reusable-components/Board.js'
import { auth } from './../services/firebase'
import { getBoardPosters } from './../helpers/movieDatabase.js'

const axios = require('axios')

class MyBoards extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      myBoards: undefined,
    }
  }

  componentDidMount() {
    auth().onAuthStateChanged((user) => {
      if (user) {
        this.loadPosters()
      }
    });
  }

  callback = (dbBoards)=>{
    Object.keys(dbBoards).forEach(async (boardId) => {
       var posters = {}
       await getBoardPosters(dbBoards[boardId].movies).then((posters_path) => {
       posters = posters_path
        dbBoards[boardId]['posters'] = posters
        this.setState({ myBoards: dbBoards, loaded: true })
       })
    })
  }

  loadPosters = async () => {
    getUserBoards(this.callback)
  }

  render() {
    return (
      <div
        style={{
          backgroundColor: '#414141',
          height: window.innerHeight,
          position: 'relative',
        }}
      >
        <Header></Header>

        <div
          style={{
            paddingTop: 100,
            color: '#4D4D4D',
            fontSize: 60,
            textAlign: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              flexWrap: 'nowrap',
              overflowX: 'auto',
              padding: 10,
              backgroundColor: '#4D4D4D',
              marginTop: 50,
              fontFamily: 'Poppins',
              fontSize: 20,
            }}
          >
            {this.state.loaded &&
              Object.keys(this.state.myBoards).map((boardId, index) => {
                return (
                  <div style={{ margin: 10 }}>
                    <Board
                      name={this.state.myBoards[boardId].title}
                      nStars={this.state.myBoards[boardId].nStars}
                      postersPath={this.state.myBoards[boardId].posters}
                    ></Board>
                  </div>
                )
              })}
            <div
              style={{
                margin: 10,
                width: 156,
                height: 210,
                fontFamily: 'Poppins',
                fontSize: 15,
                flexWrap: 'wrap',
                backgroundColor: "#575757",
                color: "#4C4C4C"
              }}
              onClick={() => { console.log("To implement") }}
            >
              <div style={{ fontSize: 91, fontWeight: 'bold', paddingTop: '25%' }}>+</div>
              <div style={{ fontSize: 15, fontWeight: 'normal' }}>Create a board</div>
            </div>
            <div
              style={{
                position: 'absolute',
                top: 135,
                left: 20,
                color: '#8C8C8C',
                fontFamily: 'Poppins',
                fontWeight: 'bolder',
                fontSize: 20,
              }}
            >
              My boards
            </div>
          </div>
          My Boards is coming in the next update...
        </div>
      </div>
    )
  }
}
export default MyBoards
