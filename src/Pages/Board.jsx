import React, { Component } from 'react'
import { getBoardPosters, getMoviesInfo } from '../helpers/movieDatabase.js'
import BoardView from '../reusable-components/BoardView.js'
import Movie from '../reusable-components/MovieView.js'
import Header from './../reusable-components/Header.js'
import { auth, database } from './../services/firebase.js'
import MovieInfoModal from './../reusable-components/MovieInfoModal.js'
import ReactLoading from 'react-loading'
import { addMovieToBoard, removeMovieFromBoard } from '../helpers/database.js'
import Toggle from "react-toggle"
import "react-toggle/style.css"

const axios = require('axios')

class Board extends Component {
  constructor(props) {
    super(props)
    this.state = {
      edit: false,
      boardId: null,
      boardInfo: {},
      moviesInfo: {},
      loaded: false,
      modalMovieIsOpen: false,
      modalMovieInfo: {
        poster_path: null,
        title: null,
        synopsis: null,
        voteAverage: null,
        movieId: null,
        cast: null,
        productionCompanies: null,
        productionCountries: null,
        releaseDate: null,
      },
      searchText: '',
      searchResults: [],
      searchLoaded: false,
      searchLoading: false,
      searchResultsAdded: {},
    }
  }

  componentDidMount() {
    this.setState({ boardId: this.props.match.params.id })
    this.getBoardInfo()
  }

  getBoardInfo = async () => {
    database.ref(`boards/${this.props.match.params.id}`).on('value', (snapshot) => {
      this.setState({ boardInfo: snapshot.val() })
      var movies = snapshot.val().movies
      if (movies != undefined) {
        getBoardPosters(movies).then((posters_path) => {
          var boardPosters = { boardPosters: posters_path }
          this.setState({ boardInfo: { ...this.state.boardInfo, ...boardPosters } })
          getMoviesInfo(movies).then((moviesInfo) => {
            this.setState({ moviesInfo: { ...moviesInfo, }, loaded: true })
          })
        })
      } else {
        console.log("hello")
        this.setState({ moviesInfo: {}, loaded: true })
      }
    })
  }

  openModal = async (id, type, movieInfo = null) => {
    if (type == "inBoard") {
      this.setState({ modalMovieInfo: { ...this.state.moviesInfo[id], movieId: id }, modalMovieIsOpen: true })
    } else if (type == "search") {
      this.setState({ modalMovieInfo: { ...movieInfo, movieId: id }, modalMovieIsOpen: true })
    } else {
      console.log("Wrong type")
    }
  }

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
      var searchMoviesTemp = {}
      for (var movie of movies.data.results) {
        searchMoviesTemp[movie.id] = false
      }
      this.setState({ searchLoaded: true, searchResults: movies.data.results, searchLoading: false, searchResultsAdded: searchMoviesTemp })
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
      this.setState({ searchLoading: true })
      await this.searchMovie()
    }
  }

  addMovie = (movieId) => {
    if (this.state.boardInfo.createdBy === auth().currentUser.uid) {
      if (movieId != null) {
        if (this.state.boardInfo.movies != undefined) {
          if (this.state.boardInfo.movies.includes(movieId)) {
            console.log("Already in the list")
            this.setState({ searchResultsAdded: { ...this.state.searchResultsAdded, [movieId]: true } })
          } else {
            addMovieToBoard(this.props.match.params.id, movieId)
            console.log("Added to the list!")
            this.setState({ searchResultsAdded: { ...this.state.searchResultsAdded, [movieId]: true } })
          }
        } else {
          addMovieToBoard(this.props.match.params.id, movieId)
          this.setState({ searchResultsAdded: { ...this.state.searchResultsAdded, [movieId]: true } })
        }
      } else {
        console.log('MovieId null')
      }
    } else {
      console.log("Not your board")
    }
  }

  render() {
    console.log(this.state.boardInfo.createdBy, auth().currentUser.uid)

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
          cast={this.state.modalMovieInfo.cast}
          productionCompanies={this.state.modalMovieInfo.productionCompanies}
          productionCountries={this.state.modalMovieInfo.productionCountries}
          releaseDate={this.state.modalMovieInfo.releaseDate}
          title={this.state.modalMovieInfo.title}
          posterPath={this.state.modalMovieInfo.poster}
          synopsis={this.state.modalMovieInfo.synopsis}
          addToBoard={() => {
            this.addMovie(this.state.modalMovieInfo.movieId)
          }}
          closeModal={() => {
            this.setState({ modalMovieIsOpen: false })
          }}
          isModalOpen={this.state.modalMovieIsOpen}
        ></MovieInfoModal>
        <div style={{ paddingTop: 100 }}></div>
        {!this.state.loaded &&
          <div style={{ paddingLeft: '45%' }}>
            <ReactLoading type={'bubbles'} color="white" height={'10%'} width={'10%'} />
          </div>
        }
        {this.state.loaded &&
          <div>
            <div style={{
              margin: 20,
              flexDirection: 'row',
              display: "flex"
            }}>
              <div
                style={{
                  width: 400,
                  marginLeft: 100,
                }}>
                <BoardView
                  name={this.state.boardInfo.title}
                  nStars={this.state.boardInfo.nStars}
                  postersPath={this.state.boardInfo.boardPosters != undefined ? this.state.boardInfo.boardPosters : [null, null, null, null]}
                  hideBanner={true}
                  width={156 * 2}
                  height={210 * 2}
                  filter={"drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"}
                  zIndec={2}></BoardView>
              </div>
              <div style={{
                width: 900,
                fontFamily: 'Poppins',
                color: '#D4D4D4',
                fontSize: 15,
              }}>
                <div style={{
                  fontWeight: 'bolder',
                  fontSize: 30,
                  color: 'white',
                  textAlign: 'left'
                }}>{this.state.boardInfo.title}</div>
                <div style={{
                  fontFamily: 'Poppins',
                  fontWeight: 'normal',
                  textAlign: 'left'
                }}>Created by: user#{this.state.boardInfo.createdBy.slice(-5)}</div>
                <div style={{ height: 250, width: '100%', color: '#7C7C7C', paddingTop: 20 }}>Description not available</div>
                <div style={{ flexDirection: 'row', display: 'flex', }}>
                  <div style={{ width: '15%' }}>{this.state.boardInfo.movies != undefined ? this.state.boardInfo.movies.length : 0} movies </div>
                  <div style={{ width: '15%' }}>{this.state.boardInfo.nStars} stars </div>
                  <div style={{ width: '20%' }}> Last update: {("0" + new Date(this.state.boardInfo.lastUpdate).getDate()).slice(-2)}/{("0" + new Date(this.state.boardInfo.lastUpdate).getMonth() + 1).slice(-2)}/{new Date(this.state.boardInfo.lastUpdate).getFullYear()}</div>
                </div>
              </div>
            </div>
            <div>
              <div style={{
                display: 'flex',
                flexDirection: "row"
              }}>
                <div style={{
                  width: "85%",
                  textAlign: 'left',
                  color: '#8C8C8C',
                  fontFamily: 'Poppins',
                  fontWeight: 'bolder',
                  fontSize: 20,
                  margin: 20
                }}>Movies</div>
                {this.state.boardInfo.createdBy === auth().currentUser.uid
                  && <div style={{
                    display: "flex",
                    alignItems: "center",
                    width: "5%",
                    color: '#8C8C8C',
                    fontFamily: 'Poppins',
                    fontWeight: 'normal',
                    textDecoration: '#8C8C8C underline',
                    fontSize: 20,
                    textAlign: 'right',
                  }}>Edit
                <div style={{
                      display: "flex",
                      alignItems: "center",
                      width: '10%',
                      textAlign: 'left',
                    }}>

                      <Toggle
                        defaultChecked={this.state.edit}
                        onChange={() => { this.setState({ edit: !this.state.edit }) }}
                      /></div>
                  </div>}
              </div>
              <div style={{
                width: 'auto',
                flexWrap: 'wrap',
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: '#4D4D4D',
                padding: 20
              }}>
                {Object.keys(this.state.moviesInfo).map((movieId) => {
                  return (
                    <div>
                      <div style={{ margin: 10 }} onClick={() => this.openModal(movieId, "inBoard")}>
                        <Movie
                          title={this.state.moviesInfo[movieId].title}
                          voteAverage={this.state.moviesInfo[movieId].vote_average}
                          posterPath={this.state.moviesInfo[movieId].poster}
                        ></Movie>
                      </div>
                      {this.state.edit &&
                        <div
                          style={{
                            margin: 10,
                            marginLeft: '25%',
                            color: "white",
                            fontFamily: 'Poppins',
                            fontSize: 15,
                            textAlign: "center",
                            width: '50%',
                            textDecoration: "white underline"
                          }}
                          onClick={() => { removeMovieFromBoard(this.state.boardId, movieId) }}>
                          Remove
                        </div>}
                    </div>
                  )
                })}
              </div>
            </div>
            {this.state.boardInfo.createdBy === auth().currentUser.uid &&
              <div>
                <div style={{ display: 'flex', flexDirection: 'row', marginTop: 50 }}>
                  <div style={{
                    width: 1200,
                    color: '#8C8C8C',
                    fontFamily: 'Poppins',
                    fontWeight: 'bolder',
                    fontSize: 20,
                    margin: 20,
                    marginBottom: 0
                  }}>Add to the board: </div>
                  <div style={{
                    width: 200,
                    margin: 20,
                    marginBottom: 0
                  }}>
                    <input
                      style={{
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

                {this.state.searchLoading && (
                  <div style={{ paddingLeft: '45%' }}>
                    <ReactLoading type={'bubbles'} color="white" height={'10%'} width={'10%'} />
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
                    marginTop: 20,
                  }}
                >
                  {!this.state.searchLoaded &&
                    <div style={{ minHeight: 210 }}></div>}
                  {!this.state.searchLoading &&
                    this.state.searchLoaded &&
                    this.state.searchResults.length > 0 &&
                    this.state.searchResults.map((movie, index) => {
                      return (
                        <div style={{ margin: 10 }} onClick={() => {
                          this.openModal(movie.id, "search",
                            {
                              title: movie.title,
                              vote_average: movie.vote_average,
                              poster: movie.poster_path,
                              synopsis: movie.overview
                            })
                        }}>
                          <Movie
                            title={movie.title}
                            voteAverage={movie.vote_average}
                            posterPath={movie.poster_path}
                          ></Movie>
                          {this.state.searchResultsAdded[movie.id] &&
                            <div style={{
                              backgroundColor: "#D40000",
                              position: "relative",
                              top: -200,
                              left: 10,
                              padding: 5,
                              fontSize: 10,
                              textAlign: "center",
                              width: "30%",
                              borderRadius: 14,
                              margin: 0,
                              color: 'white',
                              fontFamily: "Poppins"
                            }}>
                              Added ✓</div>}
                        </div>
                      )
                    })}
                </div>
              </div>}
          </div>}
        <div style={{ width: "auto", height: 100, paddingTop: 40, color: "#D4D4D4", fontFamily: "Poppins", fontSize: 15, textAlign: "center" }}> Smovies Copyright 2021 ©</div>
      </div>
    )
  }
}
export default Board
