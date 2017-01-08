import React, { Component } from 'react';
import Item from './Item';
import {ItemList} from './ItemList';
import * as d3 from 'd3';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: {}
    }
  }

  componentDidMount() {
    // ID of the Google Spreadsheet
    let spreadsheetID = "1f-VK6GAJciN5-p4uCWMUllY9_6HRgnr8yoQBv8AaoT4";
    var _this = this;
    // Make sure it is public or set to Anyone with link can view 
    let url = "https://spreadsheets.google.com/feeds/list/"+spreadsheetID+"/od6/public/values?alt=json";
    d3.json(url).get(function (data) {
      _this.setState({data: data.feed.entry});
    })


  }

  render() {
    let ItemList=[];
    for (var d in this.state.data) {
      ItemList.push({
        imageURL: this.state.data[d]["gsx$imagesource"]["$t"],
        type:  this.state.data[d]["gsx$type"]["$t"],
        name:  this.state.data[d]["gsx$projectname"]["$t"]
       })
    }

    return (
      <div className="App">
           {ItemList.map((d,i) => <Item key={i} id={i} name={d.name} type={d.type} imageURL={d.imageURL} />)} 
      </div>
    );
  }
}

export default App;