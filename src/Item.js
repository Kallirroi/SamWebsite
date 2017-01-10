import React from 'react';
import './App.css';


class Item extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			isMouseInside: false
		};
		this.showDetails=this.showDetails.bind(this);
		this.mouseEnter = this.mouseEnter.bind(this);
		this.mouseExit = this.mouseExit.bind(this);
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

	mouseEnter = () => {
	  this.setState({ isMouseInside: true });
	}
	mouseExit = () => {
	  this.setState({ isMouseInside: false });
	}


	render() {
		let classNameItemType = this.state.isMouseInside ? "ItemType" : "ItemTypeIsHidden";
		let classNameItemDetails = this.state.isMouseInside ? "ItemDetailsIsHidden" : "ItemDetails";
		return (
	        <div className={this.props.type} ref={ref => { this.ref = ref; }} onClick={this.showDetails}  onMouseEnter={this.mouseEnter} onMouseOut={this.mouseExit} > 
	        	<div className="player" dangerouslySetInnerHTML={ {__html: this.props.soundcloud} }></div>
	        	<img src={this.props.imageURL} role="presentation" className={this.props.imagesAnxiety} /> 
	        	<div className={classNameItemType}> 
	        		{this.props.type} 
	        	</div>
	        	<div className={classNameItemDetails} > 
	        		<p>{this.props.details1}</p>
        			<p>{this.props.details2}</p>
        			<p>{this.props.details3}</p>
        			<p>{this.props.details4}</p>
        			<p>{this.props.details5}</p>
	        	</div> 
	        </div>
	    )
	}
}


export default Item;

