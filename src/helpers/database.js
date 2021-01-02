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

export async function getBoardInfo(boardId) {
  var boardInfo = []
  database.ref(`boards/${boardId}`).on('value', (snapshot) => {
    boardInfo = snapshot.val()
  })
  return boardInfo
}

export async function getUserBoards() {
  var userId = auth().currentUser
  try{
    var boards = []
    var bInfo = {}
    database.ref(`users/${userId.uid}/boards`).on('value', async  (snapshot) => {
      snapshot.forEach((snap) =>{
        boards.push(snap.val())
      })
      var boardsInfo = {}
      if (boards.length > 1) {
        boards.forEach(async (value) => {
          var info = await getBoardInfo(value)
          boardsInfo[value] = info
        })
      }else if (boards.length ==1){
        var boardId=boards[0]
        var info = await getBoardInfo(boardId)
        boardsInfo[boardId]=info
      }else{
        return []
      }
      console.log(boardsInfo)
      bInfo = boardsInfo
    })
    return bInfo
  }catch (error){
    console.log(error)
    return 0
  }
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
