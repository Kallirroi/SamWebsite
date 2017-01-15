import React from 'react';
import './App.css';


class ProjectIntro extends React.Component {

	render() {
		return (
				<div className="ProjectItemIntro"> 
		        	<p>{this.props.name} </p>
	        		{this.props.details1}<br/><br/>
        			{this.props.details2}<br/><br/>
        			{this.props.details3}<br/><br/>
        			{this.props.details4}<br/><br/>
        			<a href={this.props.detailslink} target="_blank"> {this.props.detailslink} </a>
		        </div>
	    )
	}
}


export default ProjectIntro;

