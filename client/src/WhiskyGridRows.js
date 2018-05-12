import React, { Component } from 'react';

class WhiskyGridRows extends Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    return (      
        this.props.whiskyList.map(whisky =>
            <tr key={whisky.Prod_ID}>      
                <td>{whisky.Prod_Name}</td>
                <td>{whisky.Prod_abv}</td>
                <td>{whisky.Prod_Age}</td>
            </tr>
        )         
    );
  }
}

export default WhiskyGridRows;