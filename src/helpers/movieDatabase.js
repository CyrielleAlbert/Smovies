const axios = require('axios')

export async function getBoardPosters(moviesList) {
  var i = 0
  var postersPath = []
  while (postersPath.length < 4 && i < moviesList.length) {
    try {
      const movieInfo = await axios.get('https://api.themoviedb.org/3/movie/' + moviesList[i], {
        params: {
          api_key: process.env.REACT_APP_MOVIES_API_KEY,
          language: 'en_US',
        },
      })
      if (movieInfo.data.poster_path != null){
          postersPath.push(movieInfo.data.poster_path)
      }
    } catch(error){
        console.log(error)
    }
    i++
  }
  while (postersPath.length<4){
      postersPath.push(null)
  }
  return postersPath
}
