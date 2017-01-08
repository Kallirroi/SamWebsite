import React, { Component } from 'react';

import * as d3 from 'd3';

const GameLoop = ChildComponent => class extends Component {
  constructor() {
    super();
        // ID of the Google Spreadsheet
    let spreadsheetID = "1pTiFvBhlodR067hZZ3en48tt4EahDShWK6PIGVRKcC8";
    // Make sure it is public or set to Anyone with link can view 
    let url = "https://spreadsheets.google.com/feeds/list/"+spreadsheetID+"/od6/public/values?alt=json";
    this.state = {
          data: d3.json(url).get(function (data) {
                 data.feed.entry;
                })
        }
  }

  render() {
    return <ChildComponent {...this.props} data={this.state.data} />
  }
}

export default GameLoop;