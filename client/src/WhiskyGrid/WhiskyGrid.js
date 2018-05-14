import React, { Component } from 'react';
import WhiskyGridRow from './WhiskyGridRow.js';
import DefaultRow from './DefaultRow.js';
import { Table, Badge } from 'reactstrap';
import '.././style.css';


class WhiskyGrid extends Component {
  state = {whiskies: []}

 componentDidMount() {
    fetch('/whiskies/getWhiskies')
      .then(res => res.json())
      .then(whiskies => this.setState({ whiskies }));
  }

  render() {
    return (
      <div>
        <div>
        <h1>My <Badge color="dark">Whiskies</Badge></h1>
        </div>
        <div className="whiskyTable">
            <Table dark>
                <thead>
                    <tr>
                        <th className="per30">Name</th>                    
                        <th className="per20">Age</th>
                        <th className="per20">ABV</th>
                        <th className="per20"></th>  
                    </tr>            
                </thead>
                <tbody>
                    <WhiskyGridRow
                        whiskyList={this.state.whiskies}
                    />
                    <DefaultRow/>
                </tbody>
            </Table>
        </div>
      </div>
    );
  }
}

export default WhiskyGrid;