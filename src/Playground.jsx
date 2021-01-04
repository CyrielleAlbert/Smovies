import React, { Component } from 'react'
import Header from './reusable-components/Header.js'
import Theme from './reusable-components/Theme/Theme.js'

const axios = require('axios')

const boardLists = []
const board1 = {
  name: 'Top10',
  nStars: 15,
  moviesId: [1933, 11324, 3594, 629],
  posters: [],
}

const board2 = {
  name: 'Top11',
  nStars: 15,
  moviesId: [11324, 3594, 629, 1933],
  posters: [],
}

class Playground extends Component {
  constructor(props) {
    super(props)
    this.state = {}
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
        board1.posters.push('https://image.tmdb.org/t/p/original' + movies.data.poster_path)
        if (board1.posters.length == 4) {
          this.setState({ loaded: true })
          console.log(this.state.loaded)
          console.log(board1.posters)
        }
      } catch (error) {
        console.log(error)
      }
    })
  }

  render() {
    return (
      <div
        style={{
          height: window.innerHeight,

          backgroundColor: '#414141',
          border: 'solid',

          position: 'relative',
          display: 'flex',
        }}
      >
        <Header></Header>
        <div
          style={{
            width: window.innerWidth,
            paddingTop: 200,
            border: 'solid',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Theme
            boardList={[board1, board1, board1, board1, board1, board1, board1, board1, board1, board1, board1, board1]}
          ></Theme>
        </div>
      </div>
    )
  }
}
export default Playground
