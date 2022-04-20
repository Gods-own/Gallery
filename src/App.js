import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import Users from './components/users';
import Albums from './components/albums';
import Photos from './components/photos';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className='App'>
          <BrowserRouter>
          <nav className="navbar navbar-expand-lg navbar-light bg-dark">
            <div className="container-fluid">
              <a className="navbar-brand text-white fst-italic" href="#">
                <img src={require("./assets/logo.png")} alt="" width="50" height="50"/>
                Explore
              </a>
              <button className="navbar-toggler bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav nav-pills ms-auto">
                  <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to="/">Users</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/favourite-photos">Favourites</Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

            <div className='container-fluid'>
              <Routes>
                <Route path="/" element={<Users />} />
                <Route path="/user-albums/:userId" element={<Albums />} />
                <Route path="/album-photos/:albumId" element={<Photos />} />
                <Route path="/favourite-photos" />
              </Routes>
            </div>  
          </BrowserRouter>
        </div>
      </Provider>
    )
  }
}

export default App;
