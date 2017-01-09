import React from 'react';
import './App.css';


class Item extends React.Component {

	componentDidMount(){
		this.ref.addEventListener('click', () => {
     	 console.log(this.props);
    	}, true);
	}
	render() {
		return (
	        <div  ref={ref => { this.ref = ref; }}  className="Item"> <img src={this.props.imageURL} role="presentation"  /> {this.props.name} {this.props.type} </div>
	    )
	}
}


export default Item;

