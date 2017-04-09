import React, { Component } from 'react';
import RegionCollection from './region_collection';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <RegionCollection/>
        </div>
      </div>
    );
  }
}

export default App;
