import React, { Component, useEffect } from 'react'
import Header from './../reusable-components/Header.js'
import Board from './../reusable-components/Board.js'
import { auth, database } from './../services/firebase.js'
import Movie from './../reusable-components/MovieView.js'
import MovieInfoModal from './../reusable-components/MovieInfoModal.js'
import ReactLoading from 'react-loading'
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
      loading: false,
      searchText: '',
      loaded: false,
      boards: [],
      user: auth().currentUser,
      search: false,
      searchResults: [],
      discoverMovies: [],
      modalMovieIsOpen: false,
      modalMovie: {
        poster_path: null,
        title: null,
        synopsis: null,
        voteAverage: null,
      },
    }
  }

  async componentDidMount() {
    console.log(this.state.user)
    try {
      await this.loadPoster()
      await this.discoverMovie()
      await this.getMovieInfo(671)
    } catch (error) {
      console.log(error)
    }
  }
  
  /**
   * Get the info of the movie and open the modal
   * @param {Integer} id 
   */
  openModal = async (id) => {
    try {
      console.log('id', id)
      await this.getMovieInfo(id)
      this.setState({ modalMovieIsOpen: true })
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * Get the information of the movie corresponding to the id
   * @param {Integer} id 
   */
  getMovieInfo = async (id) => {
    try {
      const movieInfo = await axios.get('https://api.themoviedb.org/3/movie/' + id, {
        params: {
          api_key: process.env.REACT_APP_MOVIES_API_KEY,
          language: 'en_US',
        },
      })
      const modalInfo = {
        title: movieInfo.data.original_title,
        poster_path: 'https://image.tmdb.org/t/p/original' + movieInfo.data.poster_path,
        synopsis: movieInfo.data.overview,
        voteAverage: movieInfo.data.vote_average,
      }
      console.log(modalInfo)
      this.setState({ modalMovie: modalInfo })
    } catch (error) {
      console.log(error)
    }
  }

  discoverMovie = async () => {
    try {
      const movies = await axios.get('https://api.themoviedb.org/3/discover/movie', {
        params: {
          api_key: process.env.REACT_APP_MOVIES_API_KEY,
          language: 'en_US',
          sort_by: 'popularity.desc',
          include_adult: false,
          include_video: false,
          year: 2019,
        },
      })
      this.setState({ discoverMovies: movies.data.results })
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
          this.setState({ loaded: true })
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
      this.setState({ loaded: true, searchResults: movies.data.results, loading: false })
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
        this.setState({ search: true, loading: true })
        await this.searchMovie()
      } else {
        //Imp search in Firebase
        this.setState({ loading: true })
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
        <MovieInfoModal
          title={this.state.modalMovie.title}
          posterPath={this.state.modalMovie.poster_path}
          synopsis={this.state.modalMovie.synopsis}
          addToBoard={() => {
            console.log('TODO')
          }}
          closeModal={() => {
            this.setState({ modalMovieIsOpen: false })
          }}
          isModalOpen={this.state.modalMovieIsOpen}
        ></MovieInfoModal>
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
              onClick={() => this.setState({ search: false, searchText: '' })}
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
        {this.state.loading && (
          <div style={{ paddingLeft: '45%' }}>
            <ReactLoading type={'bubbles'} color="white" height={'10%'} width={'10%'} />
          </div>
        )}
        {!this.state.search && (
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
            }}
          >
            {this.state.discoverMovies.map((movie, index) => {
              return (
                <div style={{ margin: 10 }} onClick={() => this.openModal(movie.id)}>
                  <Movie
                    title={movie.original_title}
                    voteAverage={movie.vote_average}
                    posterPath={movie.poster_path}
                  ></Movie>
                </div>
              )
            })}
            <div
              style={{
                position: 'absolute',
                top: 178,
                left: 20,
                color: '#8C8C8C',
                fontFamily: 'Poppins',
                fontWeight: 'bolder',
                fontSize: 20,
              }}
            >
              Best of 2019
            </div>
          </div>
        )}
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
          }}
        >
          {!this.state.loading &&
            this.state.search &&
            this.state.loaded &&
            this.state.searchResults.length > 0 &&
            this.state.searchResults.map((movie, index) => {
              return (
                <div style={{ margin: 10 }} onClick={() => this.openModal(movie.id)}>
                  <Movie
                    title={movie.original_title}
                    voteAverage={movie.vote_average}
                    posterPath={movie.poster_path}
                  ></Movie>
                </div>
              )
            })}
        </div>
      </div>
    )
  }
}
export default Discovery
