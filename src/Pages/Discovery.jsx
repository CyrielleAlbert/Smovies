import React, { Component, useEffect } from 'react'
import Header from './../reusable-components/Header.js'
import Board from './../reusable-components/Board.js'

const axios = require('axios')

const board1 = {
  name: 'Top10',
  nStars: 15,
  moviesId: [11324, 3594, 629, 1933],
}
var posters = []

class Discovery extends Component {
  constructor(props) {
    super(props)
    this.state = {
      toggleBM: {
        type: 'movies',
        colors: ['#D40000', '#525252'],
      },
      searchText: '',
      loaded: false,
    }
  }

  async componentDidMount() {
    try {
      await this.loadPoster()
    } catch (error) {
      console.log(error)
    }
  }

  loadPoster = async () => {
    board1.moviesId.forEach(async (movieId) => {
      try {
        const movies = await axios.get('https://api.themoviedb.org/3/movie/' + movieId, {
          params: {
            api_key: process.env.REACT_APP_MOVIES_API_KEY,
            language: 'en_US',
          },
        })
        posters.push('https://image.tmdb.org/t/p/original' + movies.data.poster_path)
        if (posters.length == 4) {
          this.setState({ loaded: true })
          console.log(this.state.loaded)
          console.log(posters)
        }
      } catch (error) {
        console.log(error)
      }
    })
  }

  changeSearch = (event) => {
    this.setState({ searchText: event.target.value })
  }

  handleSearch = (event) => {
    if (event.key === 'Enter') {
      console.log('Enter', this.state.searchText)
    }
  }

  toggleBoardsMovies = () => {
    if (this.state.toggleBM.type == 'movies') {
      this.setState({
        toggleBM: {
          type: 'boards',
          colors: ['#525252', '#D40000'],
        },
      })
    } else {
      this.setState({
        toggleBM: {
          type: 'movies',
          colors: ['#D40000', '#525252'],
        },
      })
    }
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
            fontSize: 20,
            textAlign: 'center',
          }}
        >
          <div style={{ flexDirection: 'row', display: 'flex', paddingTop: 0, color: 'white', fontSize: 30 }}>
            <div style={{ width: '33%', verticalAlign: 'center' }}>
              <div
                style={{
                  flexDirection: 'row',
                  display: 'flex',
                  width: 200,
                  height: 30,
                  backgroundColor: 'yellow',
                  fontSize: 20,
                  fontWeight: 'normal',
                  marginLeft: '5%',
                }}
              >
                <div
                  onClick={this.toggleBoardsMovies}
                  style={{ width: '50%', backgroundColor: this.state.toggleBM.colors[0] }}
                >
                  Movies
                </div>
                <div
                  onClick={this.toggleBoardsMovies}
                  style={{ width: '50%', backgroundColor: this.state.toggleBM.colors[1] }}
                >
                  Boards
                </div>
              </div>
            </div>
            <div style={{ width: '33%', fontWeight: 'bold', letterSpacing: '0.2em' }}>Discover</div>
            <div style={{ width: '33%', textAlign: 'right', paddingRight: '5%' }}>
              <input
                style={{
                  width: '50%',
                  backgroundColor: '#525252',
                  color: 'white',
                  fontFamily: 'Poppins',
                  borderWidth: 0,
                  borderRadius: 24,
                  outline: 'none',
                  padding: 5,
                }}
                type="text"
                placeholder="Search"
                value={this.state.searchText}
                onChange={this.changeSearch}
                onKeyDown={this.handleSearch}
              />
            </div>
          </div>
        </div>
        <Board name={board1.name} nStars={board1.nStars} movies={posters} style={{fontFamily: 'Poppins', fontSize:20}}></Board>
      </div>
    )
  }
}
export default Discovery
