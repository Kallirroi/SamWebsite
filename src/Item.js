import React from 'react';
import './App.css';
import Draggable from 'react-draggable';

class Item extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			isMouseInside: false,
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
	  e.preventDefault();
      const {x, y} = this.state.deltaPosition;
      this.setState({
        deltaPosition: {
          x: x + ui.deltaX,
          y: y + ui.deltaY,
        }
      });
    }

    onStart(e) {
		e.preventDefault();
		this.setState({readyForClick: false});
    }

    onStop(e) {
		e.preventDefault();
		this.setState({readyForClick: true});
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
	 	let coordinateY = 400 * this.props.index;
        this.props.type !== "Instagram" ? this.props.selectItem(this.props.id, coordinateY) : window.open(this.props.detailslink, '_blank');	
	}  

	mouseEnter = () => {
	  this.setState({ isMouseInside: true });
	}
	mouseExit = () => {
	  this.setState({ isMouseInside: false });
	}

	render() {
		const divStyle = {
		  left: this.props.type==='Project' ? (Math.cos(this.props.index) +1) * 7 + 'vw' : (Math.cos(this.props.index) +1) * 30 + 'vw',
		  top: (Math.sin(this.props.index) -1) * 10 + 'vh' 
		};		
		let classNameItemType = this.state.isMouseInside ? "ItemType ItemTypeIsHidden" : "ItemType"; 
		let classNameItemDetails = this.state.isMouseInside ? "ItemDetails" : "ItemDetails ItemDetailsIsHidden";
		return (
			<Draggable zIndex={100} onStart={this.onStart} onDrag={this.handleDrag} onStop={this.onStop}>
	            <div className="box no-cursor">
			        <div style={divStyle} className={this.props.type} onMouseEnter={this.mouseEnter} onMouseOut={this.mouseExit} ref={ref => { this.ref = ref; }} onClick={this.showDetails} > 
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

export default Item;

