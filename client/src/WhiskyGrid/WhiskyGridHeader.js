import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import IconSort from '@fortawesome/fontawesome-free-solid/faSort'
import IconSortUp from '@fortawesome/fontawesome-free-solid/faSortUp'
import IconSortDown from '@fortawesome/fontawesome-free-solid/faSortDown'


const iconComponents = {
  asc: IconSortDown,
  desc: IconSortUp,
  neutral: IconSort}


class WhiskyGridHeader extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  
  handleClick() {
    this.props.onClickEvent(this.props.name.toLowerCase());
  }
  
  render() {
    let iconHTML = "";
    //we check if we have no sorting at all or if we have a sorting and it applies for the current header, else leave iconHTML as is
    if (this.props.sorting.direction == "neutral" || (this.props.sorting.direction !== "neutral" && this.props.name.toLowerCase() === this.props.sorting.column)) {
        iconHTML = <FontAwesomeIcon icon={iconComponents[this.props.sorting.direction]} />;    
    }

    return (
        <th className={this.props.widthClass} onClick={this.handleClick}>{iconHTML}  {this.props.name}</th>
    )
  }
}

export default WhiskyGridHeader;