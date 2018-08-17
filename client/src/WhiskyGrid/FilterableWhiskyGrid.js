import React, { Component } from 'react';
import WhiskyGridHeader from './WhiskyGridHeader';
import { Input, InputGroup, InputGroupButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle, Table, Badge } from 'reactstrap';
import '.././style.css';
import WhiskyGrid from './WhiskyGrid';


class FilterableWhiskyGrid extends Component {
    constructor(props){
        super(props);
        this.state = {
            whiskies: [],
            filteredWhiskies: [],
            sorting: {
                direction : "neutral",
                column: "id"
            },
            activePage: 1,
            totalRows: 0,
            dropdownOpen: false,
            splitButtonOpen: false,
            dropdownFilterValue: "Name",
            filterText: ""
        };
        this.onAdd = this.onAdd.bind(this);
        this.onRemove = this.onRemove.bind(this);
        this.toggleDropDown = this.toggleDropDown.bind(this);
        this.sortBy = this.sortBy.bind(this);
        this.compareBy = this.compareBy.bind(this);
        this.changeDropdowndropdownFilterValue = this.changeDropdowndropdownFilterValue.bind(this);
        this.filterTextChange = this.filterTextChange.bind(this);
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

    toggleDropDown() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    changeDropdowndropdownFilterValue(e) {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen,
            dropdownFilterValue: e.target.innerText
        });
    }
    
    filterTextChange(e) {
        if (e.target.value.trim().length === 0) { this.setState({ filteredWhiskies : [], totalRows: this.state.whiskies.length, filterText: '' }); return; };
        const currentDropdownVal = this.state.dropdownFilterValue.toLowerCase();
        const filteredArr = this.state.whiskies.filter(whisky => whisky[currentDropdownVal].toString().toLowerCase().indexOf(e.target.value) !== -1);
        this.setState({ filteredWhiskies : filteredArr, totalRows : filteredArr.length, filterText: e.target.value });
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
        const currentTableData = this.state.filterText !== '' ? this.state.filteredWhiskies : this.state.whiskies;
        return (
            <div>
                <div>
                    <h1>My <Badge color="dark">Whiskies</Badge></h1>
                </div>
                <div className="searchFilter">
                    <InputGroup>
                        <Input placeholder="Search by..." onChange={this.filterTextChange}/>
                        <InputGroupButtonDropdown addonType="append" isOpen={this.state.dropdownOpen} toggle={this.toggleDropDown}>
                            <DropdownToggle caret>
                                {this.state.dropdownFilterValue}
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={this.changeDropdowndropdownFilterValue}>Name</DropdownItem>
                                <DropdownItem onClick={this.changeDropdowndropdownFilterValue}>Age</DropdownItem>
                                <DropdownItem onClick={this.changeDropdowndropdownFilterValue}>ABV</DropdownItem>
                            </DropdownMenu>
                        </InputGroupButtonDropdown>
                    </InputGroup>
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
                        <WhiskyGrid whiskies={currentTableData} filterText={this.state.filterText} onAdd={this.onAdd} onRemove={this.onRemove}/>                   
                    </Table>    
                </div>
            </div>
        )
    }

}

export default FilterableWhiskyGrid;