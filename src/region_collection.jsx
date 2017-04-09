import React, { Component } from 'react';
import Region from "./region";
import Year from "./year";
import Month from "./month";

class RegionCollection extends Component {
  state = {
    region: null,
    year: null,
    month: null,
    year_to: null,
    month_to: null,
    regions: [],
    years:[],
    years_to: [],
    months: [],
    months_to: [],
    index_from: null,
    index_to: null,
    price: 100000
  };

  add_regions_to_state = (element, index, array) => {
    this.state.regions.push(element);
  };

  add_years_to_state = (element, index, array) => {
    this.state.years.push(element);
  };

  add_years_to_to_state = (element, index, array) => {
    this.state.years_to.push(element);
  };

  add_months_to_state = (element, index, array) => {
    this.state.months.push(element);
  };

  add_months_to_to_state = (element, index, array) => {
    this.state.months_to.push(element);
  };

  request_months_to = (year) => {
    var request = new Request('https://house-api-test.herokuapp.com/region/year?region_name=' + this.state.region + '&number=' + year, {
      method: 'GET',
      mode: 'cors',
    });

    fetch(request)
        .then(response => response.json())
        .then(json => {
          json['data'].forEach(this.add_months_to_to_state);
          this.forceUpdate();
        });
  };

  request_months = (year) => {
    var request = new Request('https://house-api-test.herokuapp.com/region/year?region_name=' + this.state.region + '&number=' + year, {
      method: 'GET',
      mode: 'cors',
    });

    fetch(request)
        .then(response => response.json())
        .then(json => {
          json['data'].forEach(this.add_months_to_state);
          this.forceUpdate();
        });
  };

  request_years_to = (name) => {
    var request = new Request('https://house-api-test.herokuapp.com/region?name=' + name, {
      method: 'GET',
      mode: 'cors',
    });

    fetch(request)
        .then(response => response.json())
        .then(json => {
          json['years'].forEach(this.add_years_to_to_state);
          this.forceUpdate();
        });
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
    this.setState({years: []});
    this.setState({months: []});
    this.setState({region: name});
    this.refs.year.innerHTML = 'Select Year';
    this.refs.month.innerHTML = 'Select Month';
  };

  year_click = (year) => {
    this.request_months(year);
    this.setState({months: []});
    this.setState({year: year});
    this.refs.year.innerHTML = year;
    this.refs.month.innerHTML = 'Select Month';
  };

  year_to_click = (year) => {
    this.request_months_to(year);
    this.setState({months_to: []});
    this.setState({year_to: year});
    this.refs.year_to.innerHTML = year;
    this.refs.month_to.innerHTML = 'Select Month';
  };

  month_click = (month, index) => {
    this.refs.month.innerHTML = month + ' ' + index;
    this.setState({years_to: []});
    this.setState({index_from: index});
    this.request_years_to(this.state.region);
  };

  month_to_click = (month, index) => {
    this.setState({index_to: index});
    this.refs.month_to.innerHTML = month + ' ' + index;
  };

  componentWillMount() {
    this.request_data();
  }

  index_price = () => {
    if (this.state.index_from !== null && this.state.index_to !== null) {
      var indexed_price = (this.state.index_to / this.state.index_from) * this.state.price
      this.refs.indexed_price.innerHTML = indexed_price
    } else {
      alert('Please select From and To dates');
    }
  };

  change_price = (event) => {
    this.setState({price: event.target.value});
  };

  render() {
    var regions = this.state.regions.map(function(region) {
      return (
          <Region name={region} key={region} onClick={this.region_click}/>
      )}, this);

    var years = this.state.years.map(function(year) {
      return (
          <Year year={year} key={year} onClick={this.year_click} />
      )}, this);

    var years_to = this.state.years_to.map(function(year) {
      return (
          <Year year={year} key={year} onClick={this.year_to_click} />
      )}, this);

    var months = this.state.months.map(function(month) {
      return (
          <Month name={month[0]} index={month[1]} key={month[0]} onClick={this.month_click} />
      )}, this);

    var months_to = this.state.months_to.map(function(month) {
      return (
          <Month name={month[0]} index={month[1]} key={month[0]} onClick={this.month_to_click} />
      )}, this);

    return(
       <div className="RegionsCollection">
         <h3 ref="name">Select Region</h3>
         <div  className="Regions">
           {regions}
         </div>
         <h2>From</h2>
         <h3 ref="year">Select Year</h3>
         <div  className="Years">
           {years}
         </div>
         <h3 ref="month">Select Month</h3>
         <div className="Months">
           {months}
         </div>
         <h2>To</h2>
         <h3 ref="year_to">Select Year</h3>
         <div  className="Years">
           {years_to}
         </div>
         <h3 ref="month_to">Select Month</h3>
         <div className="Months">
           {months_to}
         </div>
         <h2>Indexed Price</h2>
         <div>
           <input defaultValue={100000} onChange={this.change_price} />
           <button onClick={this.index_price}>Calculate!</button>
           <h3 ref="indexed_price"></h3>
         </div>
       </div>
    );
  }
}

export default RegionCollection;
