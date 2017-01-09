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
        console.log(this.props.id);
        this.setState({current: this.props.id});
	  }  


	render() {
		return (
	        <div className="Item" ref={ref => { this.ref = ref; }}  onClick={this.showDetails}  > <img src={this.props.imageURL} role="presentation"  /> {this.props.name} {this.props.type} </div>
	    )
	}
}


export default Item;

