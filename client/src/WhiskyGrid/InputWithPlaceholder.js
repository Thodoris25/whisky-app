import React, { Component } from 'react';
import '.././style.css';


class InputWithPlaceholder extends Component {
  constructor(props) {
    super(props);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleBlur(e) {
    this.props.handleBlur(e);
  }
  
  render() {
    return (
        <input name={this.props.name} placeholder={this.props.placeholder} onBlur={this.handleBlur}></input>
    )
  }
}

export default InputWithPlaceholder;