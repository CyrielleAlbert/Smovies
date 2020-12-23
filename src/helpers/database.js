import { auth, database } from './../services/firebase.js'
import uuid from 'react-uuid'

export async function getAllBoards(){
  database.ref('boards').on('value', (snapshot) => {
    let allBoards = []
    snapshot.forEach((snap) => {
      allBoards.push(snap.val())
    })
    return allBoards
  })
  return 0
}

export async function getUserBoards(userId){
  database.ref('boards').on('value', (snapshot) => {
    let allBoards = []
    snapshot.forEach((snap) => {
      allBoards.push(snap.val())
    })
    return allBoards
  })
  return 0
}

export async function createBoard(board){
  var uid = uuid()
  var user= auth().currentUser
  database.ref(`boards/${user.uid}/${uid}`).set({
    movies: board.moviesId,
    createdBy: auth().currentUser.uid,
    nStars: board.nStars,
    title: board.title,
  })
}

export async function updateBoard(boardId,updatedValues){
    var user = auth().currentUser
    database.ref(`boards/${user.uid}/${boardId}`)
    .update(updatedValues)
}

export async function updateUser(updatedValues){
    var user = auth().currentUser
    database.ref(`users/${user.uid}`)
    .update(updatedValues)
}

export async function createUser(user){
  database.ref(`users/${user.uid}`).set({
    email: user.email,
    createdAt: user.metadata.creationTime,
    lastConnection: user.metadata.lastSignInTime,
    savedBoards: [],
    savedMovies: [],
  })
}

export default {createUser, createBoard, getUserBoards, getAllBoards, updateBoard, updateUser};
