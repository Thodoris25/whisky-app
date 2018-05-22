import React, { Component } from 'react';
import WhiskyGridRow from './WhiskyGridRow.js';
import DefaultRow from './DefaultRow.js';
import { Table, Badge } from 'reactstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import IconSort from '@fortawesome/fontawesome-free-solid/faSort'
import IconSortUp from '@fortawesome/fontawesome-free-solid/faSortUp'
import IconSortDown from '@fortawesome/fontawesome-free-solid/faSortDown'
import '.././style.css';


class WhiskyGrid extends Component {
    constructor(props){
        super(props);
        this.state = {
            whiskies: [],
            sorting: ""
        };
        this.onAdd = this.onAdd.bind(this);
        this.onRemove = this.onRemove.bind(this);
        this.sortBy = this.sortBy.bind(this);
        this.compareBy = this.compareBy.bind(this);
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

    compareBy(key, sorting) {
        let multiplier = 1;

        if (sorting === "desc") {
            multiplier = -1;
        }
        
        return function (a, b) {
            if (a[key] < b[key]) return multiplier * (-1);
            if (a[key] > b[key]) return multiplier * 1;
            return 0;
        };  
    }
     
    sortBy(key) {
        const newSorting = this.state.sorting === "" ? "asc" : (this.state.sorting === "asc" ? "desc" : "");
        if (newSorting === "") {
            key = "Prod_ID";
        }
        let arrayCopy = [...this.state.whiskies];
        arrayCopy.sort(this.compareBy(key, newSorting));
        this.setState({whiskies: arrayCopy, sorting: newSorting});
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
                                <th className="per30" onClick={() => this.sortBy('Prod_Name')}><FontAwesomeIcon icon={IconSort} />  Name</th>                    
                                <th className="per20" onClick={() => this.sortBy('Prod_Age')}><FontAwesomeIcon icon={IconSort} />  Age</th>
                                <th className="per20" onClick={() => this.sortBy('Prod_abv')}><FontAwesomeIcon icon={IconSort} />  ABV</th>
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