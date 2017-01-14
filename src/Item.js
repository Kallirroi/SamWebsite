import React from 'react';
import './App.css';

import ReactDOM from 'react-dom';
import Draggable from 'react-draggable';

class Item extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			isMouseInside: false,
			activeDrags: 0,
	        deltaPosition: {
	          x: 0, y: 0
	        }
		};
		this.showDetails=this.showDetails.bind(this);
		this.mouseEnter = this.mouseEnter.bind(this);
		this.mouseExit = this.mouseExit.bind(this);
		this.handleDrag = this.handleDrag.bind(this);
		this.onStart = this.onStart.bind(this);
		this.onStop = this.onStop.bind(this);
	}

	handleDrag(e, ui) {
      const {x, y} = this.state.deltaPosition;
      this.setState({
        deltaPosition: {
          x: x + ui.deltaX,
          y: y + ui.deltaY,
        }
      });
    }

    onStart() {
      this.setState({activeDrags: ++this.state.activeDrags});
    }

    onStop() {
      this.setState({activeDrags: --this.state.activeDrags});
    }

	componentDidMount(){
		this.ref.addEventListener('click', this.showDetails, true);
		this.ref.addEventListener('mouseEnter', this.mouseEnter, true);
		this.ref.addEventListener('mouseExit', this.mouseExit, true);
		this.ref.addEventListener('handleDrag', this.handleDrag, true);
		this.ref.addEventListener('onStart', this.onStart, true);
		this.ref.addEventListener('onStop', this.onStop, true);
	}

	componentWillUnmount(){
		this.ref.removeEventListener('click', this.showDetails, true);
		this.ref.removeEventListener('mouseEnter', this.mouseEnter, true);
		this.ref.removeEventListener('mouseExit', this.mouseExit, true);
		this.ref.removeEventListener('handleDrag', this.handleDrag, true);
		this.ref.removeEventListener('onStart', this.onStart, true);
		this.ref.removeEventListener('onStop', this.onStop, true);
	}	

	showDetails(e) {
	 	e.preventDefault();
        this.props.type !== "Instagram" ? this.props.selectItem(this.props.id) : window.open(this.props.detailslink, '_blank');
	}  

	mouseEnter = () => {
	  this.setState({ isMouseInside: true });
	}
	mouseExit = () => {
	  this.setState({ isMouseInside: false });
	}

	render() {
		const dragHandlers = {onStart: this.onStart, onStop: this.onStop};
		const {deltaPosition, controlledPosition} = this.state;

		let classNameItemType = this.state.isMouseInside ? "ItemType ItemTypeIsHidden" : "ItemType"; {/*FLIPPING the classNameItemType with the classNameItelDetails*/}
		let classNameItemDetails = this.state.isMouseInside ? "ItemDetails" : "ItemDetails ItemDetailsIsHidden";
		return (
		<Draggable
            zIndex={100}
            onStart={this.handleStart}
            onDrag={this.handleDrag}
            onStop={this.handleStop}>
            <div className="box no-cursor">
		        <div className={this.props.type} onMouseEnter={this.mouseEnter} onMouseOut={this.mouseExit} ref={ref => { this.ref = ref; }} onClick={this.showDetails} > 
		        	<div className="player" dangerouslySetInnerHTML={ {__html: this.props.soundcloud} }></div>
		        	<img src={this.props.imageURL} role="presentation" className={this.props.imagesAnxiety}/>
		        	<div className={classNameItemType}>  
		        		<p>{this.props.name} </p>
		        		<p>{this.props.type} </p>
		        	</div>
		        	<div className={classNameItemDetails} onMouseEnter={this.mouseEnter} onMouseOut={this.mouseExit}  > 
		        		{this.props.details1}<br/><br/>
	        			{this.props.details2}<br/><br/>
	        			{this.props.details3}<br/><br/>
	        			{this.props.details4}        			
		        	</div> 
		        </div>
            </div>
        </Draggable>
	    )
	}
}



{/*<div class="sketchfab-embed-wrapper"><iframe width="640" height="480" src="https://sketchfab.com/models/79366ddaf0964a819452165c06fb37f5/embed?autostart=1&amp;preload=1" frameborder="0" allowvr allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true" onmousewheel=""></iframe>
</div>*/}

export default Item;

