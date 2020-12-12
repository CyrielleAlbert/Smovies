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
            backgroundColor: '#414141',
            height: window.innerHeight,
            position: 'relative',
	    display: 'flex',
	    displayDirection: 'row',
            justifyContent: 'center',	  
          }}
      >
	  <Header></Header>  
	  <List></List>
	  <div
	    style={{
	      topMargin: '30',
              display: 'flex',
	      displayDirection: 'row',
	      justifyContent: 'center',		    
	    }}
	  >
	    <List></List>
	  </div>  
      </div>	    
    )
  }
}
export default Playground
