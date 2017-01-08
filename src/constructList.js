import * as d3 from 'd3';
import {ItemList} from './ItemList';

export function constructList() {
   // ID of the Google Spreadsheet
  let spreadsheetID = "1pTiFvBhlodR067hZZ3en48tt4EahDShWK6PIGVRKcC8";

  // Make sure it is public or set to Anyone with link can view 
  let url = "https://spreadsheets.google.com/feeds/list/"+spreadsheetID+"/od6/public/values?alt=json";

  let state  = {
  	imageURL:   d3.json(url, function (data) {
			     let entry = data.feed.entry;
			     return entry[0]["gsx$pinterest"]["$t"];
			  	})
  }

  return state; 
}
