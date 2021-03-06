import React from 'react';
import './App.css';


class Project extends React.Component {

	componentDidMount(){
		this.ref.addEventListener('click', () => {
     	 this.setState({current: this.props.id});
    	}, true);
	}

	render() {
		return (
	        <div className="ProjectItem" ref={ref => { this.ref = ref; }} > 
		        <div  className="ProjectItemDetails" > 
		        	› 
		        	<span id="noUnderline">{this.props.name} </span>
					 <br/>
		        </div>
		        <div className="ProjectItemDetails" > 

	        		{this.props.details1}<br/>
        			{this.props.details2}<br/>
        			{this.props.details3}<br/>
        			{this.props.details4}<br/>
        			› <a className="ProjectItemDetails-Link" href={this.props.detailslink} target="_blank"> {this.props.detailslink} </a>
		        </div>
	        	<div className="Doc" dangerouslySetInnerHTML={ {__html: this.props.doc} }></div> 
	        	<img src={this.props.imageURL} role="presentation"/> 
	        	<div className="ProjectItemDetails" >
	        		<div className="ProjectItemDetails-Caption">
	        			{this.props.caption}
	        		</div>
	        	</div> 
	        </div>
	    )
	}
}


export default Project;