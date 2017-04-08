import React, { Component } from 'react';

class Month extends Component {
  month_click = () => {
    this.props.onClick(this.props.name, this.props.index);
  };

  render() {
    return(
        <div className="Month">
          <button onClick={this.month_click}>
            {this.props.name}
          </button>
        </div>
    );
  }
}

export default Month;
