import React from 'react';
import { Button } from 'reactstrap';
import InputWithPlaceholder from './InputWithPlaceholder';


class DefaultRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: "", age: "", abv: ""};
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        fetch('/whiskies/addWhisky', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: 'yourValue',
                age: 'yourOtherValue',
                abv: ''
            })
        })
        .then(function(response){
            console.log('inserted id is: '+response)
        })
    }

    handleBlur() {
        this.setState({
            
        });
    }
    
    render() {
        return (      
                <tr>      
                    <td><InputWithPlaceholder placeholder="Insert name"/></td>
                    <td><InputWithPlaceholder placeholder="Insert age"/></td>
                    <td><InputWithPlaceholder placeholder="Insert abv"/></td>
                    <td><div className="right"><Button onClick={this.handleClick} color="success">Add</Button></div></td>
                </tr>
        )
    }        
}

export default DefaultRow;