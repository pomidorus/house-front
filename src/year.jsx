import React, { Component } from 'react';

class Year extends Component {
  year_click = () => {
    this.props.onClick(this.props.year);
  };

  render() {
    return(
        <div className="Year">
          <button onClick={this.year_click}>
            {this.props.year}
          </button>
        </div>
    );
  }
}

export default Year;

