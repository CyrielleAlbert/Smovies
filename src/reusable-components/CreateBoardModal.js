import Modal from 'react-modal'
import React, { useState } from 'react';
import { createBoard } from './../helpers/database'
import Movie from './../reusable-components/MovieView'
import ReactLoading from 'react-loading'


const axios = require('axios')


const CreateBoardModal= ({ closeModal, isModalOpen, ...props }) => {
  Modal.setAppElement('body')
  const [name, setName] = useState(null)
  const [movies, setMovies] = useState([])
  const [search, setSearch] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [searchResults, setSearchResults] = useState([])

  const searchMovie = async () => {
    try {
      const movies = await axios.get('https://api.themoviedb.org/3/search/movie', {
        params: {
          api_key: process.env.REACT_APP_MOVIES_API_KEY,
          language: 'en_US',
          query: search,
        },
      })
      setLoaded(true)
      setLoading(false)
      setSearchResults(movies.data.results)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSearch = async (event) => {
    if (event.key === 'Enter') {
      setLoading(true)
      await searchMovie()
    }
  }
  
  const addMovie = (movieId) => {
    console.log("Hi")
    if (movies.includes(movieId)){
      console.log("Already in the list")
    } else{
      console.log("Added to the list!")
      var movies_temp = movies
      movies_temp.push(movieId)
      setMovies(movies_temp)
    }
  }

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      style={{
        overlay: { backgroundColor: 'rgba(65, 65, 65, 0.01)', backdropFilter: 'blur(10px)', },
        content: {
          marginTop: 60,
          marginBottom: 10,
          marginLeft: 60,
          marginRight: 60,
          backgroundColor: '#414141',
          boxShadow: '0px 0px 45px 25px rgba(0, 0, 0, 0.25)',
          borderWidth: 0,
          borderRadius: 0,
        },
      }}
    >
      <div
        style={{
          backgroundColor: '#414141',
          fontFamily: 'Poppins',
          color: 'white',
          padding: 10,
          textAlign: 'center'
        }}
      >
        <div style={{ fontSize: 40, color: "white", textAlign: 'center' }}> Create a new board</div>
        <div style={{ marginTop: 50, padding: 5 }}> Choose a name:</div>
        <input
          style={{
            width: '25%',
            backgroundColor: '#525252',
            color: 'white',
            fontFamily: 'Poppins',
            borderWidth: 0,
            borderRadius: 24,
            outline: 'none',
            padding: 5,
            marginTop: 15,

          }}
          type="text"
          placeholder="Name of the board"
          value={name}
          onChange={(event) => { setName(event.target.value) }}
        />
        <div style={{ marginTop: 50, padding: 5 }}> And add your first movies:</div>
        <input
          style={{
            width: '25%',
            backgroundColor: '#525252',
            color: 'white',
            fontFamily: 'Poppins',
            borderWidth: 0,
            borderRadius: 24,
            outline: 'none',
            padding: 5,
            marginTop: 15,

          }}
          type="text"
          placeholder="Search"
          value={search}
          onChange={(event) => { setSearch(event.target.value) }}
          onKeyDown={(event)=> {handleSearch(event)}}
        />
        {loading && (
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
            marginTop: 50,
          }}
        >
        {!loading && loaded && searchResults.length > 0 &&
          searchResults.map((movie, index) => {
            return (
              <div style={{ margin: 10 }} onClick={() => addMovie(movie.id)}>
                <Movie
                  title={movie.original_title}
                  voteAverage={movie.vote_average}
                  posterPath={movie.poster_path}
                ></Movie>
              </div>
            )
          })}

      </div>
      <div style={{ display: 'flex', flexDirection: 'row', marginTop: 20 }}>
        <div style={{ width: '50%' }}>
          <button
            style={{
              backgroundColor: '#D40000',
              borderRadius: 31,
              borderWidth: 0,
              padding: 10,
              fontSize: 20,
              color: 'white',
              width: '50%',
              textAlign: 'center',
            }}
            onClick={() => {
              if (name != null) {
                createBoard({ moviesId: movies, title: name, })
                closeModal()
              } else {
                console.log("ouuups no name")
              }
            }}
          >
            + Create the board
          </button>
        </div>
        <div style={{ width: '50%', justifyContent: 'flex-end', display: 'flex' }}>
          <button
            style={{
              backgroundColor: '#4C4C4C',
              borderRadius: 31,
              borderWidth: 0,
              padding: 10,
              fontSize: 20,
              color: 'white',
              width: '50%',
              textAlign: 'center',
            }}
            onClick={closeModal}
          >
            close
          </button>
        </div>
      </div>
      </div>
    </Modal >
  )
}

export default CreateBoardModal;