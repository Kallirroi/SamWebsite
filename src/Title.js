import React from 'react';
import './App.css';

class Title extends React.Component {

	render() {
		return (
		        <div className={["ImagesAnxiety", "Title"].join(' ')} > 
		        ›<span id="noUnderline">Recent Preoccupations</span> 
		        	<p className="Times"> •Updated Fall 2018 </p>
		        </div>
	    )
	}
}


export default Title;

