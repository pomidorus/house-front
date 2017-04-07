import React, { Component } from 'react';

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

  componentWillMount() {
    this.request_data();
  }

  render() {
    var regions = this.state.regions.map(function(region) {
      return (
          <div className="Region" key={region}>
            <a href={"https://house-api-test.herokuapp.com/region?name="+ region}>
              {region}
            </a>
          </div>
      )});
    return(
       <div className="Collection">
         {regions}
       </div>
    );
  }
}

export default RegionCollection;
