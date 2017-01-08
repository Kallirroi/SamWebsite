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
    let spreadsheetID = "1pTiFvBhlodR067hZZ3en48tt4EahDShWK6PIGVRKcC8";
    var _this = this;
    // Make sure it is public or set to Anyone with link can view 
    let url = "https://spreadsheets.google.com/feeds/list/"+spreadsheetID+"/od6/public/values?alt=json";
    d3.json(url).get(function (data) {
      _this.setState({data: data.feed.entry[0]["gsx$pinterest"]["$t"]});
    })


  }

  render() {
    let imageURL= this.state.data;
    return (
      <div className="App">
           {ItemList.map((d,i) => <Item key={i} id={i} name={d.name} text={d.text} imageURL={imageURL} />)} 
      </div>
    );
  }
}

export default App;