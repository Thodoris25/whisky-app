import React, { Component } from 'react';
import WhiskyGridHeader from './WhiskyGridHeader';
import { Table, Badge, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import '.././style.css';
import WhiskyGrid from './WhiskyGrid';


class FilterableWhiskyGrid extends Component {
    constructor(props){
        super(props);
        this.state = {
            whiskies: [],
            sorting: {
                direction : "neutral",
                column: "id"
            },
            activePage: 1,
            totalRows: 0
        };
        this.onAdd = this.onAdd.bind(this);
        this.onRemove = this.onRemove.bind(this);
        this.sortBy = this.sortBy.bind(this);
        this.compareBy = this.compareBy.bind(this);
    };

    componentDidMount() {
        fetch('/whiskies/getWhiskies')
        .then(res => res.json())
        .then(data => this.setState({ whiskies: data.whiskies, totalRows: data.totalRows }))
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
            .then(data => this.setState({ whiskies: data.whiskies, totalRows: data.totalRows }));
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
            const arrayCopy = this.state.whiskies.filter((row) => row.id !== rowToDelete.rowID);
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
        const newSorting = this.state.sorting.direction === "neutral" ? "asc" : (this.state.sorting.direction === "asc" ? "desc" : "neutral");
        if (newSorting === "neutral") {
            key = "id";
        }
        let arrayCopy = [...this.state.whiskies];
        arrayCopy.sort(this.compareBy(key, newSorting));
        this.setState({whiskies: arrayCopy, sorting: {direction: newSorting, column: key}});
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
                                <WhiskyGridHeader widthClass="per30" name = "Name" onClickEvent={this.sortBy} sorting={this.state.sorting}/>
                                <WhiskyGridHeader widthClass="per20" name = "Age" onClickEvent={this.sortBy} sorting={this.state.sorting} />
                                <WhiskyGridHeader widthClass="per20" name = "ABV" onClickEvent={this.sortBy} sorting={this.state.sorting} />
                                <th className="per20"></th>  
                            </tr>            
                        </thead>
                        <WhiskyGrid whiskies={this.state.whiskies} onAdd={this.onAdd} onRemove={this.onRemove}/>                   
                    </Table>    
                </div>
<div>
                <Pagination aria-label="Page navigation example">
        <PaginationItem>
          <PaginationLink previous href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">
            3
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">
            4
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">
            5
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink next href="#" />
        </PaginationItem>
      </Pagination>
      </div>
            </div>
        )
    }

}

export default FilterableWhiskyGrid;