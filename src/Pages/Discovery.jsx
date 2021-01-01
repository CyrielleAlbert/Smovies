import React, { Component, useEffect } from 'react'
import Header from './../reusable-components/Header.js'
import Board from './../reusable-components/Board.js'
import { auth, database } from './../services/firebase.js'
import Movie from './../reusable-components/MovieView.js'
const axios = require('axios')

const uuid = 'f9c18570-44ea-11eb-b378-0242ac1300020'
const board1 = {
  title: 'Best movies ever',
  nStars: 20,
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
      boards: [],
      user: auth().currentUser,
      search: false,
      searchResults: [],
    }
  }

  async componentDidMount() {
    console.log(this.state.user)
    try {
      await this.loadPoster()
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * Load some posters (depreciated)
   */
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
          //this.setState({ loaded: true })
          console.log(this.state.loaded)
          console.log(posters)
        }
      } catch (error) {
        console.log(error)
      }
    })
  }

  /**
   * Store the text for search
   * @param {*} event
   */
  changeSearch = (event) => {
    this.setState({ searchText: event.target.value })
  }

  /**
   * Find a movie in the Movie database
   */
  searchMovie = async () => {
    try {
      const movies = await axios.get('https://api.themoviedb.org/3/search/movie', {
        params: {
          api_key: process.env.REACT_APP_MOVIES_API_KEY,
          language: 'en_US',
          query: this.state.searchText,
        },
      })
      this.setState({ loaded: true, searchResults: movies.data.results })
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * Handle the search of movies or boards.
   * @param {*} event
   */
  handleSearch = async (event) => {
    if (event.key === 'Enter') {
      if (this.state.toggleBM.type == 'movies') {
        this.setState({ search: true })
        await this.searchMovie()
      } else {
        //Imp search in Firebase
        console.log('not implemented')
      }
    }
  }

  /**
   * Change between type of discovery
   */
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
            <div
              style={{ width: '33%', fontWeight: 'bold', letterSpacing: '0.2em' }}
              onClick={() => this.setState({ search: false, searchText:'' })}
            >
              Discover
            </div>
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
        {this.state.search &&
          this.state.loaded &&
          this.state.searchResults.length > 0 &&
          this.state.searchResults.map((movie, index) => {
            return (
              <div style={{ marginBottom: 50, paddingBottom: 50 }}>
                <Movie
                  title={
                    movie.original_title.length < 8 ? movie.original_title : movie.original_title.slice(0, 8) + '...'
                  }
                  voteAverage={movie.vote_average}
                  posterPath={movie.poster_path}
                  id={movie.id}
                ></Movie>
              </div>
            )
          })}
      </div>
    )
  }
}
export default Discovery
