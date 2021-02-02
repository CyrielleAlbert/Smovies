import { auth, database } from './../services/firebase.js'
import uuid from 'react-uuid'

function utcTimestampToDateString(timestamp) {
  try {
    // Convert to date object.
    const date = new Date(Number(timestamp));
    // Test date is valid.
    if (!isNaN(date.getTime())) {
      // Convert to UTC date string.
      return date.toUTCString();
    }
  } catch (e) {
    // Do nothing. undefined will be returned.
  }
  return undefined;
}

export async function getAllBoards(callback) {
  database.ref(`boards`).on('value', (snapshot) => {
    var allBoards = {}
    snapshot.forEach((snap) => {
      allBoards[snap.key] = (snap.val())
    })
    callback(allBoards)
  })
}

export async function getUserInfo(callback) {
  var userId = auth().currentUser
  database.ref(`users/${userId.uid}`).on('value', async (snapshot) => {
    callback(snapshot.val())
  })
}

export async function getUserBoards(callback) {
  var userId = auth().currentUser
  var boards = []
  var boardsInfo = {}
  database.ref(`users/${userId.uid}/boards`).on('value', async (snapshot) => {
    snapshot.forEach((snap) => {
      boards.push(snap.val())
    })
    if (boards.length > 1) {
      for (const boardId of boards) {
        database.ref(`boards/${boardId}`).on('value', (snapshot) => {
          boardsInfo[boardId] = snapshot.val()
          if (Object.keys(boardsInfo).length == boards.length) {
            callback(boardsInfo)
          }
        })
      }
    } else if (boards.length == 1) {
      var boardId = boards[0]
      database.ref(`boards/${boardId}`).on('value', (snapshot) => {
        callback({ [boardId]: snapshot.val() })
      })
    } else {
      callback(null)
    }
  })
}

export async function createBoard(board) {
  var uid = uuid()
  var user = auth().currentUser
  database.ref(`boards/${uid}`).set({
    movies: board.moviesId,
    createdBy: user.uid,
    nStars: 0,
    title: board.title,
  })
  getUserBoards((userBoards) => {
    if (userBoards != null && userBoards != undefined) {
      if (!Object.keys(userBoards).includes(uid)) {
        var updatedUserBoards = Object.keys(userBoards).concat([uid])
        updateUser({ boards: updatedUserBoards })
      }
    } else {
      updateUser({ boards: [uid] })
    }
  })

}

export async function createUser(user) {
  database.ref(`users/${user.uid}`).set({
    email: user.email,
    boards: [],
    createdAt: user.metadata.creationTime,
    lastConnection: user.metadata.lastSignInTime,
    savedBoards: [],
    savedMovies: [],
  })
}

export async function updateBoard(boardId, updatedValues) {
  try {
    database.ref(`boards/${boardId}`).update(updatedValues)
  } catch (error) {
    console.log(error)
  }
}

export async function addMovieToBoard(boardId, movieId) {
  database.ref(`boards/${boardId}`).on('value', (snapshot) => {
    var moviesTemp = []
    if (snapshot.val().movies != undefined) {
      var movies = [...snapshot.val().movies, movieId]
      for (var movie of movies) {
        if (!moviesTemp.includes(movie)) {
          moviesTemp.push(movie)
        }
      }
    }else {
      moviesTemp = [movieId]
    }
    updateBoard(boardId, { movies: moviesTemp, lastUpdate: utcTimestampToDateString(Date.now()) })
  })
}

export async function removeMovieFromBoard(boardId, movieId) {
  database.ref(`boards/${boardId}`).on('value', (snapshot) => {
    var movies = [...snapshot.val().movies]
    var moviesTemp = []
    for (var movie of movies) {
      if (movie != movieId) {
        if (!moviesTemp.includes(movie)) {
          moviesTemp.push(movie)
        }
      }
    }
    updateBoard(boardId, { movies: moviesTemp, lastUpdate: utcTimestampToDateString(Date.now()) })
  })
}

export async function updateUser(updatedValues) {
  var user = auth().currentUser
  database.ref(`users/${user.uid}`).update(updatedValues)
}

export async function deleteBoard(boardId) {
  var user = auth().currentUser
  database.ref(`boards/${user.uid}/${boardId}`).remove()
}

export default { createUser, createBoard, getUserBoards, getUserInfo, getAllBoards, updateBoard, addMovieToBoard, updateUser, deleteBoard }
