import React from 'react';
import './App.css';


class Title extends React.Component {

	render() {
		return (
	        <div className={[this.props.className, "Title"].join(' ')} > 
	        	sam ghantous
	        </div>
	    )
	}
}


export default Title;

