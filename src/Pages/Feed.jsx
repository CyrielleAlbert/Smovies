import React, { Component } from 'react'
import Header from '../reusable-components/Header.js'
import {NavLink} from "react-router-dom"
class Feed extends Component {

  render() {
    return (
      <div
        style={{
          backgroundColor: '#414141',
          minHeight: window.innerHeight,
          display: "flex",
          justifyContent: "center"
        }}
      >
        <Header></Header>
        <div style={{
          width: "50%",
          paddingTop: 100,

        }}>
          <div
            style={{
              color: 'white',
              fontSize: 30,
              textAlign: 'center',
              fontFamily: "Poppins",
              margin: 10,
              backgroundColor: "#4D4D4D",
              borderRadius: 31,
            }}
          >
            Welcome on Smovies! 👋
            <div style={{ fontSize: 20, marginTop: 100, textAlign: "left", padding: 10 }}>
              🔎 What is Smovies?
              <div style={{ fontSize: 15, paddingTop: 20, paddingBottom: 20 }}>Smovies is a social network for cinephiles. It is an open source project.</div>
              💎 How does it work?
              <div style={{ fontSize: 15, paddingTop: 20, paddingBottom: 20 }}>Smovies is all based on grouping movies together.
              This group, called board, is automatically shared with the community. That way, it creates links between movies and thus, better suggestions.</div>
              🌱 What is in the Beta Release of Smovies?
              <div style={{ fontSize: 15, paddingTop: 20, paddingBottom: 20 }}>
                <li>Search of movies & boards</li>
                <li>Creation of boards</li>
                <li>Add movies to boards</li>
                <li>Computer version of the web app</li>
              </div>
              🌴 What is coming next?
              <div style={{ fontSize: 15, paddingTop: 20, paddingBottom: 20 }}>
                <li>Suggestions based on boards created by the community & movies you like</li>
                <li>Social network functionalities (Followers/Following, Feed, Share options) </li>
                <li>Functionality to star boards</li>
                <li>... & more depending on what you want</li>
              </div>
              🎥 How to start?
              <div style={{ fontSize: 15, paddingTop: 20 }}>
                Go to <NavLink to="/MyBoards" style={{ color: "white" }}>My Boards</NavLink> to create your first board.
              </div>
              <div style={{ fontSize: 15, paddingBottom: 20 }}>
                Go to <NavLink to="/Discovery" style={{ color: "white" }}>Discover</NavLink> to search for movies & boards.
              </div>
              🤍 How to contribute?
              <div style={{ fontSize: 15, paddingTop: 20, paddingBottom: 20 }}>
                <li>Send us any feedback at Cyriellealbert@yahoo.fr</li>
                <li>Go to <a href="https://github.com/CyrielleAlbert/Smovies" style={{ color: "white" }}>Github</a> & create a pull request if you want to implement something.</li>
                <li>Share it with your friends to grow the community</li>
              </div>
            </div>

            <div style={{ paddingTop: 80, paddingBottom: 50 }}>Thanks for trying it! 🙌</div>
          </div>        </div>
      </div>
    )
  }
}
export default Feed
