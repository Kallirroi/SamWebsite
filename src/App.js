import React, { Component } from 'react';
import * as d3 from 'd3';
import {ItemList} from './ItemList';
import Item from './Item';


import logo from './logo.svg';
import './App.css';


class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="App">
          <img src={logo} className="App-logo" alt="logo" />
           {ItemList.map((d,i) => <Item key={i} id={i} name={d.name} text={d.text} />)} 
      </div>
    );
  }
}

export default App;


// sendRequest() {
//      // ID of the Google Spreadsheet
//     var spreadsheetID = "1pTiFvBhlodR067hZZ3en48tt4EahDShWK6PIGVRKcC8";

//     // Make sure it is public or set to Anyone with link can view 
//     var url = "https://spreadsheets.google.com/feeds/list/"+spreadsheetID+"/od6/public/values?alt=json";

//     var image = d3.json(url, function (data) {
//        var entry = data.feed.entry;
//        console.log(entry[0]["gsx$pinterest"]["$t"]);
//        this.setState({image: entry[0]["gsx$pinterest"]["$t"]});
//     });     

// }