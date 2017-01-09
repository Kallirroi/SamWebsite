import React, { Component } from 'react';
import Item from './Item';
import Project from './Project';
import * as d3 from 'd3';

import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      home: {},
      project: {},
      current: {},
      projectsHidden: false
    }
    this.showDetails=this.showDetails.bind(this);
    this.toggleViews=this.toggleViews.bind(this);
  }

  componentDidMount() {
    var _this = this;
    let homeSheetID = "1f-VK6GAJciN5-p4uCWMUllY9_6HRgnr8yoQBv8AaoT4";
    let homeURL = "https://spreadsheets.google.com/feeds/list/"+homeSheetID+"/od6/public/values?alt=json";
    let projectSheetID = "1xOGhLytCsgq9vfEtvp-hWEY8fLpJ7R7ub-9JlixXqZk";
    let projectURL = "https://spreadsheets.google.com/feeds/list/"+projectSheetID+"/od6/public/values?alt=json";
    
    d3.json(homeURL).get(function (data) {
      _this.setState({home: data.feed.entry});
    });
    
    d3.json(projectURL).get(function (data) {
      _this.setState({project: data.feed.entry});
    });

  }

  showDetails() {
    console.log("click")
  }  

  toggleViews() {
     this.setState({projectsHidden: !this.state.projectsHidden});
     console.log(this.state.projectsHidden)
  }

  render() {
    let {projectsHidden} = this.state;
    let HomeList=[];
    for (let d in this.state.home) {
      HomeList.push({
        imageURL: this.state.home[d]["gsx$imagesource"]["$t"] ? this.state.home[d]["gsx$imagesource"]["$t"] : null,
        type:  this.state.home[d]["gsx$type"]["$t"],
        name:  this.state.home[d]["gsx$projectname"]["$t"],
        ID:  this.state.home[d]["gsx$id"]["$t"]
       })
    }

    let ProjectList=[];
    for (let d in this.state.project) {
      ProjectList.push({
        imageURL: this.state.project[d]["gsx$image"]["$t"] ? this.state.project[d]["gsx$image"]["$t"] : null,
        caption:  this.state.project[d]["gsx$caption"]["$t"],
        name:  this.state.project[d]["gsx$projectname"]["$t"],
        ID:  this.state.project[d]["gsx$projectid"]["$t"]
       })
    }
    let classProject = this.state.projectsHidden ? 'ProjectListIsHidden' : 'ProjectListIsVisible';
    return (
      <div className="App">
        <div> <h2> title </h2> </div>
        <div> <button onClick={this.toggleViews}> toggle projects/home</button> </div>
        <div className="HomeListIsVisible"> {HomeList.map((d,i) => <Item key={i} id={d.ID} name={d.name} type={d.type} imageURL={d.imageURL} onClick={this.showDetails} /> )} </div>
        <div className={classProject}> {ProjectList.map((d,i) => <Project projectsHidden={projectsHidden} key={i} id={d.ID} name={d.name} type={d.type} imageURL={d.imageURL}  onClick={this.showDetails} /> )} </div>
      </div>
    );
  }
}

export default App;