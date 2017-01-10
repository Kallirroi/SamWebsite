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
	        	<div className="Doc" dangerouslySetInnerHTML={ {__html: this.props.doc} }></div> 
	        	<img src={this.props.imageURL} role="presentation"/> 
	        	<div className="ProjectItemDetails" >
	        		<div  className="ProjectItemDetails-Name"> {this.props.name}</div>
	        		<div className="ProjectItemDetails-Caption">
	        			{this.props.caption}
	        		</div>
	        	</div> 
	        </div>
	    )
	}
}


export default Project;

