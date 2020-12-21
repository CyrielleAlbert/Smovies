import React, { Component } from 'react'
import Header from './reusable-components/Header.js'
import List from './reusable-components/List.js'

class Playground extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {}
  render() {
    return (
      <div
        style={{
          height: window.innerHeight,

          backgroundColor: '#414141',
          border: 'solid',

          position: 'relative',
          display: 'flex',
        }}
      >
        <Header></Header>
        <div
          style={{
            width: window.innerWidth,
            paddingTop: 200,
            border: 'solid',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <List></List>
          <List></List>
        </div>
      </div>
    )
  }
}
export default Playground
