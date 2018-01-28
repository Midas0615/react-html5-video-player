

import React, { Component } from 'react';
import '../tooltip/toolTip.css';

class ToolTip extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.animate) {
      let interval = setTimeout(() => {
        clearTimeout(interval);
        if (this.toolTip) {
          this.toolTip.classList.add('toolTip--animate');
        }

      }, 50);
    }
  }

  render() {
    return (
      <div ref={(toolTip) => { this.toolTip = toolTip; }} className="toolTip">
        <img src={this.props.thumb} width={200} height={150} />
        <p>{this.props.description}</p>
      </div>
    );
  }
}

export default ToolTip;
