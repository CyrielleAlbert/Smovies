import React, { Component } from 'react'
import Header from './../reusable-components/Header.js'

class Discovery extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {}
  render() {
    return (
      <div
        style={{
          backgroundColor: '#414141',
          height: window.innerHeight,
          position: 'relative',
        }}
      >
        <Header></Header>
        <div
          style={{
            paddingTop: 100,
            color: '#4D4D4D',
            fontSize: 20,
            textAlign: 'center',
          }}
        >
          <div style={{flexDirection: "row", display:"flex",paddingTop:0,color:"white", fontSize: 30,}}>
            <div style={{width:"33%"}}>Boards </div>
            <div style={{width:"33%", fontWeight:"bold", letterSpacing:'0.2em'}}>Discover</div>
            <div style={{width:"33%"}}>Search</div>
          </div>
        </div>
      </div>
    )
  }
}
export default Discovery
