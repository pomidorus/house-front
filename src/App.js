import React, { Component } from 'react';
import RegionCollection from './region_collection';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to House Price Index API</h2>
        </div>
        <p className="App-intro">
          To get started, select region from list.
        </p>
        <div className="Regions">
          <RegionCollection/>
        </div>
      </div>
    );
  }
}

export default App;
