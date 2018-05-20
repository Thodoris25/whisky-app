import React, { Component } from 'react';
import WhiskyGridRow from './WhiskyGridRow.js';
import DefaultRow from './DefaultRow.js';
import { Table, Badge } from 'reactstrap';
import '.././style.css';


class WhiskyGrid extends Component {
    constructor(props){
        super(props);
        this.state = {
            whiskies: []
        };
        this.onAdd = this.onAdd.bind(this);
        this.onRemove = this.onRemove.bind(this);
    };
    
    componentDidMount() {
        fetch('/whiskies/getWhiskies')
        .then(res => res.json())
        .then(whiskies => this.setState({ whiskies }));
    }

    onAdd(newRow) {        
        fetch('/whiskies/addWhisky', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newRow)
        })
        .then(() => {
            fetch('/whiskies/getWhiskies')
            .then(res => res.json())
            .then(whiskies => this.setState({ whiskies }));
        });     
    }

    onRemove(rowToDelete) {
        fetch('/whiskies/deleteWhisky', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(rowToDelete)
        })
        .then(() => {
            const arrayCopy = this.state.whiskies.filter((row) => row.Prod_ID !== rowToDelete.rowID);
            this.setState({whiskies: arrayCopy});
        });
    }

    render() {
        const component = this;
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
                            <DefaultRow
                                key={0}
                                addNewRow={this.onAdd}
                            />
                            {                            
                                this.state.whiskies.map(whisky =>
                                    <WhiskyGridRow
                                        key={whisky.Prod_ID}
                                        whisky={whisky}
                                        onRemove={component.onRemove}
                                    />
                                )
                            }                            
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }
}

export default WhiskyGrid;