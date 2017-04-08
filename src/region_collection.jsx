import React, { Component } from 'react';
import Region from "./region";

class RegionCollection extends Component {
  state = {
    regions: []
  };

  add_regions_to_state = (element, index, array) => {
    this.state.regions.push(element);
  }

  request_data = () => {
    var request = new Request('https://house-api-test.herokuapp.com/regions', {
      method: 'GET',
      mode: 'cors'
    });

    fetch(request)
        .then(response => response.json())
        .then(json => {
          json['regions'].forEach(this.add_regions_to_state);
          this.forceUpdate();
        });
  };

  region_click = (name) => {
    this.refs.name.innerHTML = name
  };

  componentWillMount() {
    this.request_data();
  }

  render() {
    var regions = this.state.regions.map(function(region) {
      return (
          <Region name={region} key={region} onClick={this.region_click}/>
      )}, this);
    return(
       <div className="RegionsCollection">
         <h3 ref="name">Regions</h3>
         <div  className="Regions">
           {regions}
         </div>
       </div>
    );
  }
}

export default RegionCollection;
