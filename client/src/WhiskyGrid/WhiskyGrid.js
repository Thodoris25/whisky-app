import React, { Component } from 'react';
import WhiskyGridRow from './WhiskyGridRow.js';
import DefaultRow from './DefaultRow.js';


class WhiskyGrid extends Component {
    constructor(props){
        super(props);
        this.onAdd = this.onAdd.bind(this);
        this.onRemove = this.onRemove.bind(this);
    }; 

    onAdd(rowToAdd) {
        this.props.onAdd(rowToAdd);
    }
    
    onRemove(idToRemove) {
        this.props.onRemove(idToRemove);
    }
    

    render() {
        const component = this;
        return (
                <tbody>
                    {this.props.filterText !== "" ? null :
                        <DefaultRow
                            key={0}
                            addNewRow={this.onAdd}
                        />
                    }
                    {                            
                        this.props.whiskies.map(whisky =>
                            <WhiskyGridRow
                                key={whisky.id}
                                whisky={whisky}
                                onRemove={component.onRemove}
                            />
                        )
                    }                            
                </tbody>
        );
    }
}

export default WhiskyGrid;