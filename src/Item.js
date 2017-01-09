import React from 'react';
import './App.css';


class Item extends React.Component {

	constructor(props) {
		super(props);
		this.showDetails=this.showDetails.bind(this);
	}

	componentDidMount(){
		this.ref.addEventListener('click', this.showDetails, true);
	}

	componentWillUnmount(){
		this.ref.removeEventListener('click', this.showDetails);
	}	

	showDetails(e) {
	 	e.preventDefault();
        this.props.selectItem(this.props.id);
	}  


	render() {
		return (
	        <div className={this.props.type} ref={ref => { this.ref = ref; }}  onClick={this.showDetails}  > <img src={this.props.imageURL} role="presentation"  /> {this.props.name} {this.props.type} </div>
	    )
	}
}


export default Item;

