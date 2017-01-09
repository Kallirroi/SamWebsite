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
	        <div className="ProjectItem" ref={ref => { this.ref = ref; }} > <img src={this.props.imageURL} role="presentation"/> <div className="ProjectItemDetails" >{this.props.name} {this.props.caption} </div> </div>
	    )
	}
}


export default Project;

