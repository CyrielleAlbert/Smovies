import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Feed from './Pages/Feed.jsx'
import MyBoards from './Pages/MyBoards.jsx'
import Discovery from './Pages/Discovery.jsx'
import Board from './Pages/Board.jsx'
import Playground from './Playground.jsx'
import NotFound from './Pages/404.jsx'
import Login from './Pages/Login.jsx'
import Signup from './Pages/Signup.jsx'
import Home from './Pages/Home.jsx'
import { auth } from './services/firebase.js'
import MyAccount from './Pages/MyAccount.jsx'

function PrivateRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  )
}

function PublicRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => (authenticated === false ? <Component {...props} /> : <Redirect to="/feed" />)}
    />
  )
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      authenticated: false,
      loading: true,
    }
  }

  componentDidMount() {
    auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authenticated: true,
          loading: false,
        })
      } else {
        this.setState({
          authenticated: false,
          loading: false,
        })
      }
    })
  }

  render() {
    return this.state.loading === true ? (
      <h2>Loading...</h2>
    ) : (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/" component={Home} exact />
            <PublicRoute path="/login" authenticated={this.state.authenticated}  component={Login} />
            <PublicRoute path="/signup" authenticated={this.state.authenticated} component={Signup} />
            <PrivateRoute path="/feed" authenticated={this.state.authenticated} component={Feed} />
            <PrivateRoute path="/myBoards" authenticated={this.state.authenticated} component={MyBoards} />
            <PrivateRoute path="/myAccount" authenticated={this.state.authenticated} component={MyAccount} />
            <PrivateRoute path="/discovery" authenticated={this.state.authenticated} component={Discovery} />
            <PrivateRoute path="/board/:id" authenticated={this.state.authenticated} component={Board} />
            <PrivateRoute path="/playground" authenticated={this.state.authenticated} component={Playground} />
            <PublicRoute component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
