import React, { Component } from 'react';
import { Button } from 'reactstrap';
import '.././style.css';


class WhiskyGridRow extends Component {
    constructor(props){
        super(props);
        this.state = { rowID : this.props.whisky.Prod_ID}
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        this.props.onRemove(this.state);
    }

    render() {
        return (      
            <tr>    
                <td>{this.props.whisky.Prod_Name}</td>
                <td>{this.props.whisky.Prod_Age}</td>
                <td>{this.props.whisky.Prod_abv}%</td>
                <td><div className="right"><Button color="danger" onClick={this.handleClick}>Remove</Button></div></td>
            </tr>        
        );
    }
}

export default WhiskyGridRow;