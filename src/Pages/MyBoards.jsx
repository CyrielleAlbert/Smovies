import React, { Component } from 'react'
import { getUserBoards } from '../helpers/database.js'
import Header from './../reusable-components/Header.js'
import BoardView from '../reusable-components/BoardView.js'
import { auth } from './../services/firebase'
import { getBoardPosters } from './../helpers/movieDatabase.js'
import CreateBoardModal from "./../reusable-components/CreateBoardModal.js"
import { NavLink } from 'react-router-dom'
import ReactLoading from 'react-loading'

class MyBoards extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      myBoards: undefined,
      modalCreateBoardIsOpen: false,
    }
  }

  componentDidMount() {
    auth().onAuthStateChanged((user) => {
      if (user) {
        this.loadPosters()
      }
    });
  }

  callback = (dbBoards) => {
    if (dbBoards != null) {
      Object.keys(dbBoards).forEach(async (boardId) => {
        var posters = {}
        await getBoardPosters(dbBoards[boardId].movies).then((posters_path) => {
          posters = posters_path
          dbBoards[boardId]['posters'] = posters
          this.setState({ myBoards: dbBoards, loaded: true })
        })
      })
    } else {
      this.setState({ myBoards: {}, loaded: true })
    }
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
        <CreateBoardModal
          closeModal={() => {
            this.setState({ modalCreateBoardIsOpen: false })
          }}
          isModalOpen={this.state.modalCreateBoardIsOpen}
        ></CreateBoardModal>
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
            <div
              style={{
                flexWrap: 'wrap',
                fontFamily: 'Poppins',
                fontSize: 15,
                backgroundColor: "#575757",
                color: "#4C4C4C",
                margin: 10,
                minWidth: 156,
                minHeight: 210,
              }}
              onClick={() => { this.setState({ modalCreateBoardIsOpen: true }) }}
            >
              <div style={{ fontSize: 91, fontWeight: 'bold', paddingTop: '25%' }}>+</div>
              <div style={{ fontSize: 15, fontWeight: 'normal' }}>Create a board</div>
            </div>
            {!this.state.loaded &&
              <div style={{ paddingLeft: '45%' }}>
                <ReactLoading type={'bubbles'} color="white" height={'10%'} width={'10%'} />
              </div>}
            {this.state.loaded &&
              Object.keys(this.state.myBoards).map((boardId, index) => {
                return (
                  <NavLink
                    to={{
                      pathname: "/board/" + boardId,
                      aboutProps: { state: { boardInfo: this.state.myBoards[boardId] } }
                    }}

                    style={{ textDecoration: "none" }}
                  >
                    <div style={{
                      margin: 10,
                    }} key={boardId}>
                      <BoardView
                        name={this.state.myBoards[boardId].title}
                        nStars={this.state.myBoards[boardId].nStars}
                        postersPath={this.state.myBoards[boardId].posters}
                      ></BoardView>
                    </div>
                  </NavLink>
                )
              })}
            <div
              style={{
                flexWrap: 'wrap',
                fontFamily: 'Poppins',
                fontSize: 15,
                margin: 10,
                minWidth: 156,
                minHeight: 210,
              }}>
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
        </div>
      </div>
    )
  }
}
export default MyBoards
