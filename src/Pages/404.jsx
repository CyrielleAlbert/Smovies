import React, { Component } from 'react'

class Playground extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {}
  render() {
    return (
      <div style ={{backgroundColor:"#414141", textAlign:"center",fontFamily:'Poppins',height:window.innerHeight}}> 
            <div style={{color:"#4D4D4D", fontWeight:"bold",fontSize:400}}>
               404 
            </div>
            <div style={{color:"#C4C4C4", fontSize:50}}>Page not found...</div>
      </div>
    )
  }
}
export default Playground
