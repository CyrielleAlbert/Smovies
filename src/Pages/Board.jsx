import React, { Component } from "react";
import Header from './../reusable-components/Header.js'

class Board extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  render() {
    return (
      <div
        style={{
          backgroundColor: "#414141",
          height: window.innerHeight,
          position: "relative",
        }}
      >
        <Header></Header>
        <div
          style={{
            paddingTop: 250,
            color: "#4D4D4D",
            fontSize: 60,
            textAlign: "center",
          }}
        >
          Board is coming in the next update...
        </div>
      </div>
    );
  }
}
export default Board;
