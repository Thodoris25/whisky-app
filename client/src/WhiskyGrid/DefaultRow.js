import React from 'react';
import { Button } from 'reactstrap';
import InputWithPlaceholder from './InputWithPlaceholder';


class DefaultRow extends React.Component {
    constructor(props) {
        super(props);
        this.state =  {
            name: "",
            age: "",
            abv: ""
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleBlur = this.handleBlur.bind(this);  
    }

    handleClick() {
        this.props.addNewRow(this.state);
        //need to clear state
    }

    handleBlur(e) {
        this.setState(
            {[e.target.name]: e.target.value}
        );
    }
    
    render() {
        const trStyle = {
            "backgroundColor":"#565555"
        };
        return (      
                <tr style={trStyle}>      
                    <td><InputWithPlaceholder name="name" handleBlur={this.handleBlur} placeholder="Insert name"/></td>
                    <td><InputWithPlaceholder name="age" handleBlur={this.handleBlur} placeholder="Insert age"/></td>
                    <td><InputWithPlaceholder name="abv" handleBlur={this.handleBlur} placeholder="Insert abv"/></td>
                    <td><div className="right"><Button onClick={this.handleClick} color="success">Add</Button></div></td>
                </tr>
        )
    }        
}

export default DefaultRow;