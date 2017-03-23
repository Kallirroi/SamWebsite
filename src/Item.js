import React from 'react';
import './App.css';
import Draggable from 'react-draggable';

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

	showDetails() {
        this.props.type !== "Instagram" ? this.props.selectItem(this.props.id) : window.open(this.props.detailslink, '_blank');	
	}  

	mouseEnter = () => {
	  this.setState({ isMouseInside: true });
	}
	mouseExit = () => {
	  this.setState({ isMouseInside: false });
	}

	render() {
		const divStyle = {
		  left: this.props.type==='Project' ? (Math.cos(this.props.index) +1) * 7 + 'vw' : (Math.cos(this.props.index) +1) * 25 + 'vw',
		  top: (Math.sin(this.props.index) -1) * 10 + 'vh' 
		};		
		let classNameItemType = this.state.isMouseInside ? "ItemType ItemTypeIsHidden" : "ItemType"; 
		let classNameItemDetails = this.state.isMouseInside ? "ItemDetails" : "ItemDetails ItemDetailsIsHidden";
		return (
			<Draggable>
		        <div style={divStyle} className={this.props.type} onMouseEnter={this.mouseEnter} onMouseOut={this.mouseExit} ref={ref => { this.ref = ref; }}> 
		        	<div className="player" dangerouslySetInnerHTML={ {__html: this.props.soundcloud} }></div>
		        	<img src={this.props.imageURL} role="presentation" className={this.props.imagesAnxiety}/>
		        	<div className="corner hvr-curl-top-right" onClick={this.showDetails} ></div>
		        	<div className={classNameItemType}>  
		        		<p>{this.props.name} </p>
		        		<p>{this.props.type} </p>
		        	</div>
		        	<div className={classNameItemDetails} > 
		        		{this.props.details1}<br/><br/>
	        			{this.props.details2}<br/><br/>
	        			{this.props.details3}<br/><br/>
	        			{this.props.details4}        			
		        	</div> 	        	
		        </div>
	        </Draggable>
	    )
	}
}

export default Item;
