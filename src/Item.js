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
		this.ref.removeEventListener('click', this.showDetails, true);
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
		let classNameItemType = this.state.isMouseInside ? "ItemType ItemTypeIsHidden" : "ItemType";
		let classNameItemDetails = this.state.isMouseInside ? "ItemDetails" : "ItemDetails ItemDetailsIsHidden";
		return (
	        <div className={this.props.type} onMouseEnter={this.mouseEnter} onMouseOut={this.mouseExit} ref={ref => { this.ref = ref; }} onClick={this.showDetails} > 
	        	<div className="player" dangerouslySetInnerHTML={ {__html: this.props.soundcloud} }></div>
	        	<img src={this.props.imageURL} role="presentation" className={this.props.imagesAnxiety} /> 
	        	<div className={classNameItemType}>  {/*FLIPPING the classNameItemType with the classNameItelDetails*/}
	        		<p>{this.props.name} </p>
	        		<p>{this.props.type} </p>
	        		
	        	</div>
	        	<div className={classNameItemDetails} onMouseEnter={this.mouseEnter} onMouseOut={this.mouseExit}  > 
	        		{this.props.details1}<br/><br/>
        			{this.props.details2}<br/><br/>
        			{this.props.details3}<br/><br/>
        			{this.props.details4}<br/><br/>
        			{this.props.details5}
	        	</div> 
	        </div>
	    )
	}
}


export default Item;

