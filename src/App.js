import React, { Component } from 'react';
import Item from './Item';
import Project from './Project';
import * as d3 from 'd3';
import $ from 'jquery';

import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      home: {},
      project: {},
      insta: {},
      current: "",
      projectsHidden: true,
      homeHidden: false
    }
    this.backHome=this.backHome.bind(this);
    this.selectItem=this.selectItem.bind(this);
  }

  componentDidMount() {
    let _this = this;
    let homeSheetID = "1f-VK6GAJciN5-p4uCWMUllY9_6HRgnr8yoQBv8AaoT4";
    let homeURL = "https://spreadsheets.google.com/feeds/list/"+homeSheetID+"/od6/public/values?alt=json";
    let projectSheetID = "1xOGhLytCsgq9vfEtvp-hWEY8fLpJ7R7ub-9JlixXqZk";
    let projectURL = "https://spreadsheets.google.com/feeds/list/"+projectSheetID+"/od6/public/values?alt=json";
    let instaURL = "https://api.instagram.com/v1/users/self/media/recent/?access_token=2879221.d704506.df9f8ee676ea4c0fbcd6d86f98750475&callback=?";
    
    d3.json(homeURL).get(function (data) {
      _this.setState({home: data.feed.entry});
    });
    
    d3.json(projectURL).get(function (data) {
      _this.setState({project: data.feed.entry});
    });    

    $.getJSON(instaURL, function(data) { 
        console.log(data)
      })


  }
  backHome() {
     this.setState({projectsHidden: !this.state.projectsHidden});
     this.setState({homeHidden: !this.state.homeHidden});
     this.setState({current: ""});
  }

  selectItem(element) {
    this.setState({homeHidden: true});
    this.setState({projectsHidden: false});
    this.setState({current: element});
    //scroll to top of page
    window.scrollTo(0, 0);
  }

  render() {
    let HomeData=[];
    for (let d in this.state.home) {
      HomeData.push({
        imageURL: this.state.home[d]["gsx$imagesource"]["$t"] ? this.state.home[d]["gsx$imagesource"]["$t"] : null,
        type:  this.state.home[d]["gsx$type"]["$t"],
        name:  this.state.home[d]["gsx$projectname"]["$t"],
        ID:  this.state.home[d]["gsx$id"]["$t"],
        priority:  this.state.home[d]["gsx$priority"]["$t"]
       })
    }

    let ProjectData=[];
    for (let d in this.state.project) {
      ProjectData.push({
        imageURL: this.state.project[d]["gsx$imagesource"]["$t"] ? this.state.project[d]["gsx$imagesource"]["$t"] : null,
        caption:  this.state.project[d]["gsx$caption"]["$t"],
        name:  this.state.project[d]["gsx$projectname"]["$t"],
        ID:  this.state.project[d]["gsx$id"]["$t"]
       })
    }
    let HomeDataSorted = HomeData.sort((a,b)=> a.priority - b.priority);
    let ProjectDataCurrent = ProjectData.filter((d)=> d.ID === this.state.current);
    let classProject = this.state.projectsHidden ? 'ProjectDataIsHidden' : 'ProjectData ProjectDataIsVisible';
    let classButton = this.state.projectsHidden ? 'ButtonIsHidden' : 'ButtonIsVisible';
    let classHome = this.state.homeHidden ? 'HomeDataIsHidden' : 'HomeData HomeDataIsVisible';
    return (
      <div className="App">
        <div className="Title"> sam ghantous </div>
        <div className="Button" onClick={this.backHome} className={classButton} > back to overview</div>
        <div className={classHome}> 
          {HomeData.map((d,i) => <Item selectItem={this.selectItem} key={i} id={d.ID} name={d.name} type={d.type} imageURL={d.imageURL} /> )} 
        </div>
        <div className={classProject}> 
          {ProjectDataCurrent.map((d,i) => <Project key={i} id={d.ID} name={d.name} caption={d.caption} type={d.type} imageURL={d.imageURL} /> )} 
        </div>
        <div className="Footer"><a href="https://kallirroi.github.io/K/" target="_blank">Kalli</a> made this website</div>
      </div>
    );
  }
}

export default App;