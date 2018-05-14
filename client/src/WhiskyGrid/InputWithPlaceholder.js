import React, { Component } from 'react';
import '.././style.css';


class InputWithPlaceholder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value : ''
    };
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleBlur(e) {
    this.setState({
      value : e.target.value
    });
  }
  
  render() {
    return (
        <input onBlur={this.handleBlur} placeholder={this.props.placeholder}></input>
    )
  }
}

export default InputWithPlaceholder;