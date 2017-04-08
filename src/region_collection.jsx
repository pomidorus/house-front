import React, { Component } from 'react';
import Region from "./region";
import Year from "./year";

class RegionCollection extends Component {
  state = {
    regions: [],
    years:[]
  };

  add_regions_to_state = (element, index, array) => {
    this.state.regions.push(element);
  };

  add_years_to_state = (element, index, array) => {
    this.state.years.push(element);
  };

  request_years = (name) => {
    var request = new Request('https://house-api-test.herokuapp.com/region?name=' + name, {
      method: 'GET',
      mode: 'cors',
    });

    fetch(request)
        .then(response => response.json())
        .then(json => {
          json['years'].forEach(this.add_years_to_state);
          this.forceUpdate();
        });
  };

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
    this.refs.name.innerHTML = name;
    this.request_years(name);
    this.state.years = [];
  };

  year_click = (year) => {
    console.log(year);
  };

  componentWillMount() {
    this.request_data();
  }

  render() {
    var regions = this.state.regions.map(function(region) {
      return (
          <Region name={region} key={region} onClick={this.region_click}/>
      )}, this);

    var years = this.state.years.map(function(year) {
      return (
          <Year year={year} key={year} onClick={this.year_click} />
      )}, this);

    return(
       <div className="RegionsCollection">
         <h3 ref="name">Regions</h3>
         <div  className="Regions">
           {regions}
         </div>
         <h3 ref="year">Years</h3>
         <div  className="Years">
           {years}
         </div>
       </div>
    );
  }
}

export default RegionCollection;
