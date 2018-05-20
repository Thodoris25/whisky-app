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
        this.resetInputs = this.resetInputs.bind(this);  
    }

    resetInputs() {
        this.inputName.clear();
        this.inputAge.clear();
        this.inputAbv.clear();
      }

    handleClick() {
        this.resetInputs();
        this.props.addNewRow(this.state);
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
                    <td><InputWithPlaceholder ref={inputName => this.inputName = inputName} name="name" handleBlur={this.handleBlur} placeholder="Insert name"/></td>
                    <td><InputWithPlaceholder ref={inputAge => this.inputAge = inputAge} name="age" handleBlur={this.handleBlur} placeholder="Insert age"/></td>
                    <td><InputWithPlaceholder ref={inputAbv => this.inputAbv = inputAbv} name="abv" handleBlur={this.handleBlur} placeholder="Insert abv"/></td>
                    <td><div className="right"><Button onClick={this.handleClick} color="success">Add</Button></div></td>
                </tr>
        )
    }        
}

export default DefaultRow;