import React from 'react';
import './App.css';

class Item extends React.Component {
	render() {
		return (
	        <div className="Item"> <img src={this.props.imageURL} /> {this.props.name} {this.props.type} </div>
	    )
	}
}


export default Item;

