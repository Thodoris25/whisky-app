import React, { Component } from 'react';
import WhiskyGridRows from './WhiskyGridRows.js';
import './style.css';

class WhiskyGrid extends Component {
  state = {whiskies: []}

 componentDidMount() {
    fetch('/whiskies')
      .then(res => res.json())
      .then(whiskies => this.setState({ whiskies }));
  }

  render() {
    return (
      <div>
        <div>
            <h1>Whiskies</h1>
        </div>
        <table class="myClass">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>ABV</th>
                    <th>Age</th>    
                </tr>            
            </thead>
            <tbody>
                <WhiskyGridRows
                    whiskyList={this.state.whiskies}
                />
            </tbody>
        </table>
      </div>
    );
  }
}

export default WhiskyGrid;