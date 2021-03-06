const axios = require('axios')

export async function getBoardPosters(moviesList) {
  var i = 0
  var postersPath = []
  if (moviesList != undefined) {
    while (postersPath.length < 4 && i < moviesList.length) {
      try {
        const movieInfo = await axios.get('https://api.themoviedb.org/3/movie/' + moviesList[i], {
          params: {
            api_key: process.env.REACT_APP_MOVIES_API_KEY,
            language: 'en_US',
          },
        })
        if (movieInfo.data.poster_path != null) {
          postersPath.push(movieInfo.data.poster_path)
        }
      } catch (error) {
        console.log(error)
      }
      i++
    }
    while (postersPath.length < 4) {
      postersPath.push(null)
    }
    return postersPath
  }
  else {
    return []
  }

}

export async function getMoviesInfo(moviesList) {
  var moviesInfo = {}
  if (moviesList != undefined) {
    for (var movie of moviesList) {
      try {
        const movieInfo = await axios.get('https://api.themoviedb.org/3/movie/' + movie, {
          params: {
            api_key: process.env.REACT_APP_MOVIES_API_KEY,
            language: 'en_US',
          },
        })
        const castInfo = await axios.get('https://api.themoviedb.org/3/movie/' + movie + '/credits', {
          params: {
            api_key: process.env.REACT_APP_MOVIES_API_KEY,
            language: 'en_US',
          }
        })
        moviesInfo[movie] = {
          title: movieInfo.data.title,
          vote_average: movieInfo.data.vote_average,
          poster: movieInfo.data.poster_path,
          synopsis: movieInfo.data.overview,
          cast: castInfo.data.cast,
          productionCompanies: movieInfo.data.production_companies,
          productionCountries: movieInfo.data.production_countries,
          releaseDate: movieInfo.data.release_date
        }
      } catch (error) {
        console.log(error)
      }
    }
    return moviesInfo
  }else{
    return moviesInfo
  }
  }
