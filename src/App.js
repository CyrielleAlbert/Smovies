import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Pages/Home.jsx'
import MyBoards from './Pages/MyBoards.jsx'
import Discovery from './Pages/Discovery.jsx'
import Board from './Pages/Board.jsx'
import Playground from "./Playground.jsx"

class App extends Component{
  render() {
    return(
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/" component={Home} exact/>
            <Route path="/MyBoards" component={MyBoards}/>
            <Route path="/Discovery" component={Discovery}/>
            <Route path="/Board/:id" component={Board} />
            <Route path="/Playground" component = {Playground} />

          </Switch>
        </div>
      </BrowserRouter>
  );
  }
}

export default App;

