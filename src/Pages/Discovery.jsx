import React, { Component, useEffect } from 'react'
import Header from './../reusable-components/Header.js'
import BoardView from '../reusable-components/BoardView.js'
import { auth, database } from './../services/firebase.js'
import Movie from './../reusable-components/MovieView.js'
import MovieInfoModal from './../reusable-components/MovieInfoModal.js'
import ReactLoading from 'react-loading'
import { getUserBoards, addMovieToBoard, getAllBoards } from '../helpers/database.js'
import { getBoardPosters } from './../helpers/movieDatabase.js'
import { NavLink } from 'react-router-dom'

const axios = require('axios')

class Discovery extends Component {
  constructor(props) {
    super(props)
    this.state = {
      toggleBM: {
        type: 'movies',
        colors: ['#D40000', '#525252'],
      },
      allBoardsLoaded: false,
      allBoards: {},
      loading: false,
      searchText: '',
      loaded: false,
      boards: [],
      user: auth().currentUser,
      userBoards: {},
      search: false,
      searchResults: [],
      discoverMovies: [],
      searchBoardResults:[],
      modalMovieIsOpen: false,
      modalMovie: {
        movieId: null,
        poster_path: null,
        title: null,
        synopsis: null,
        voteAverage: null,
        cast: null,
        productionCompanies: null,
        productionCountries: null,
        releaseDate: null,
      },
    }
  }


  callback = (dbBoards) => {
    if (dbBoards != null) {
      Object.keys(dbBoards).forEach(async (boardId) => {
        var posters = {}
        await getBoardPosters(dbBoards[boardId].movies).then((posters_path) => {
          posters = posters_path
          dbBoards[boardId]['posters'] = posters
          console.log(dbBoards)
          this.setState({ allBoards: dbBoards, allBoardsLoaded: true })
        })
      })
    } else {
      this.setState({ allBoards: {}, allBoardsLoaded: true })
    }
  }

  async componentDidMount() {
    getAllBoards(this.callback)
    try {
      await this.discoverMovie()
      await getUserBoards((userBoards) => {
        if (userBoards != null) {
          this.setState({ userBoards: userBoards })
        }
      })

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
      const castInfo = await axios.get('https://api.themoviedb.org/3/movie/' + id + '/credits', {
        params: {
          api_key: process.env.REACT_APP_MOVIES_API_KEY,
          language: 'en_US',
        }
      })
      const modalInfo = {
        movieId: id,
        title: movieInfo.data.original_title,
        poster_path: movieInfo.data.poster_path,
        synopsis: movieInfo.data.overview,
        voteAverage: movieInfo.data.vote_average,
        cast: castInfo.data.cast,
        productionCompanies: movieInfo.data.production_companies,
        productionCountries: movieInfo.data.production_countries,
        releaseDate: movieInfo.data.release_date
      }
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
  searchBoard = async () => {
      var results = []
      
      this.setState({ loaded: true, searchBoardResults: results, loading: false })

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
        await this.searchBoard()
        this.setState({ loading: true })
        console.log('TODO')
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
          minHeight: window.innerHeight,
          position: 'relative',
        }}
      >
        <Header></Header>
        <MovieInfoModal
          cast={this.state.modalMovie.cast}
          productionCompanies={this.state.modalMovie.productionCompanies}
          productionCountries={this.state.modalMovie.productionCountries}
          releaseDate={this.state.modalMovie.releaseDate}
          movieId={this.state.modalMovie.movieId ? this.state.modalMovie.movieId : 0}
          popOver={true}
          userBoards={this.state.userBoards}
          title={this.state.modalMovie.title}
          posterPath={this.state.modalMovie.poster_path}
          synopsis={this.state.modalMovie.synopsis}
          addToBoard={(boardId, movieId) => {
            addMovieToBoard(boardId, parseInt(movieId))
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

        {/* 
        * Movies discovery
        */}

        {!this.state.search && this.state.toggleBM.type == "movies" && (
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
                    title={movie.title}
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
        {!this.state.search && this.state.toggleBM.type != "movies" &&
          <div>
            <div style={{
              position: 'absolute',
              top: 178,
              left: 20,
              color: '#8C8C8C',
              fontFamily: 'Poppins',
              fontWeight: 'bolder',
              fontSize:20,

            }}>All boards</div>
            <div style={{
              width: 'auto',
              flexWrap: 'wrap',
              display: 'flex',
              flexDirection: 'row',
              backgroundColor: '#4D4D4D',
              padding: 20,
              marginTop: 50,
            }}>
              {!this.state.allBoardsLoaded &&
                <div style={{ paddingLeft: '45%' }}>
                  <ReactLoading type={'bubbles'} color="white" height={'10%'} width={'10%'} />
                </div>}
              {this.state.allBoardsLoaded &&

                Object.keys(this.state.allBoards).map((boardId) => {
                  return (
                    <NavLink
                      to={{
                        pathname: "/board/" + boardId,
                        aboutProps: { state: { boardInfo: this.state.allBoards[boardId] } }
                      }}

                      style={{ textDecoration: "none" }}
                    >
                      <div style={{
                        margin: 10,
                      }} key={boardId}>
                        <BoardView
                          name={this.state.allBoards[boardId].title}
                          nStars={this.state.allBoards[boardId].nStars}
                          postersPath={this.state.allBoards[boardId].posters}
                        ></BoardView>
                      </div>
                    </NavLink>
                  )
                })}
            </div>
          </div>}
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
                    title={movie.title}
                    voteAverage={movie.vote_average}
                    posterPath={movie.poster_path}
                  ></Movie>
                </div>
              )
            })
          }
          {!this.state.loading &&
            this.state.search &&
            this.state.loaded &&
            this.state.searchResults.length > 0 &&
            < div
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
              Search results
            </div>
          }
        </div>
      </div >
    )
  }
}
export default Discovery
