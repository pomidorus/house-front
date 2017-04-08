import React, { Component } from 'react';

class Region extends Component {
  region_click = () => {
    this.props.onClick(this.props.name);
  };

  render() {
    return(
        <div className="Region">
          <button onClick={this.region_click}>
            {this.props.name}
          </button>
        </div>
    );
  }
}

export default Region;

