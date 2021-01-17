import { auth, database } from './../services/firebase.js'
import uuid from 'react-uuid'

export async function getAllBoards() {
  database.ref('boards').on('value', (snapshot) => {
    let allBoards = []
    snapshot.forEach((snap) => {
      allBoards.push(snap.val())
    })
    return allBoards
  })
  return 0
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
          if (Object.keys(boardsInfo).length==boards.length){
            callback(boardsInfo)
          }
        })
      }
    } else if (boards.length == 1) {
      var boardId = boards[0]
      database.ref(`boards/${boardId}`).on('value', (snapshot) => {
        boardsInfo[boardId] = snapshot.val()
        callback(boardsInfo)
      })
    } else {
      boardsInfo = null
      callback(boardsInfo)
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
  try {
    var userBoards = await getUserBoards()
    var updatedUserBoards = userBoards.concat([uid])
    await updateUser({ boards: updatedUserBoards })
  } catch (error) {
    console.log(error)
  }
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
  database.ref(`boards/${boardId}`).update(updatedValues)
}

export async function updateUser(updatedValues) {
  var user = auth().currentUser
  database.ref(`users/${user.uid}`).update(updatedValues)
}

export async function deleteBoard(boardId) {
  var user = auth().currentUser
  database.ref(`boards/${user.uid}/${boardId}`).remove()
}

export default { createUser, createBoard, getUserBoards, getAllBoards, updateBoard, updateUser, deleteBoard }
