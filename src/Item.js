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

	showDetails(e) {
		console.log(e.target.clientY);
        this.props.type !== "Instagram" ? this.props.selectItem(this.props.id) : window.open(this.props.detailslink, '_blank');	
	}  

	mouseEnter = () => {
	  this.setState({ isMouseInside: true });
	}
	mouseExit = () => {
	  this.setState({ isMouseInside: false });
	}

	render() {
		// this is what controls the position of the elements on the screen
		const divStyle = {
		  //this controls the left indent of the element
		  //this.props.index is the index of every Item that we see on main page 
		  left: this.props.type==='Project' ? (Math.cos(this.props.index) +1) * 7 + 'vw' : (Math.cos(this.props.index) +1) * 15 + 'vw',
		  //this controls the distance from top of container
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
		        		›<span id="noUnderline">{this.props.name}</span>
		        	</div>

		        </div>
	        </Draggable>
	    )
	}
}

export default Item;
