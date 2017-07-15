import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import NavBar from './containers/NavBar'
import Home from './containers/Home'
import Register from './containers/Register'
import Login from './containers/Login'
import Slick from './components/Slick'
// import '/bootstrap/dist/css/bootstrap.min.css'

class App extends Component {
  render() {
    return (
      <Router>
        <div className = "App">
          <NavBar />
          <Route exact path="/" component={Slick} />
          <div className="container">
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
