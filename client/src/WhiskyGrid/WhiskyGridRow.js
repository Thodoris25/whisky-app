import React, { Component } from 'react';
import { Button } from 'reactstrap';
import '.././style.css';


class WhiskyGridRow extends Component {
  
  render() {
    return (      
        this.props.whiskyList.map(whisky =>
            <tr key={whisky.Prod_ID}>      
                <td>{whisky.Prod_Name}</td>
                <td>{whisky.Prod_Age}</td>
                <td>{whisky.Prod_abv}%</td>
                <td><div className="right"><Button color="danger">Remove</Button></div></td>
            </tr>
        )         
    );
  }
}

export default WhiskyGridRow;