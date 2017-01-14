import React, { Component } from 'react';

import GameLoop from './GameLoop';
import Item from './Item';
import Project from './Project';
import Title from './Title';
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
    this.anxiety=this.anxiety.bind(this);

  }

  componentWillMount() {
    this.anxiety(this.props);
  }

  componentDidMount() {
    let _this = this;
    let homeSheetID = "1f-VK6GAJciN5-p4uCWMUllY9_6HRgnr8yoQBv8AaoT4";
    let homeURL = "https://spreadsheets.google.com/feeds/list/"+homeSheetID+"/od6/public/values?alt=json";
    let projectSheetID = "1xOGhLytCsgq9vfEtvp-hWEY8fLpJ7R7ub-9JlixXqZk";
    let projectURL = "https://spreadsheets.google.com/feeds/list/"+projectSheetID+"/od6/public/values?alt=json";
    let tokenArchmixes = "4115475317.1677ed0.a5b9b5c9f86845aeaaa5ac24eb809956";
    // let tokenSam = "40791457.1677ed0.b66f37fd8f31410985a1af840ab26655";
    // let tokenKalli = "2879221.d704506.df9f8ee676ea4c0fbcd6d86f98750475";
    let instaURL = "https://api.instagram.com/v1/users/self/media/recent/?access_token="+tokenArchmixes+"&callback=?";
    
    $.getJSON(homeURL, function (data) {
      _this.setState({home: data.feed.entry});
    });
    
    $.getJSON(projectURL, function (data) {
      _this.setState({project: data.feed.entry});
    });    

    $.getJSON(instaURL, function(data) {  
       _this.setState({insta: data.data});
    });
  }

 componentWillUpdate() {
    this.anxiety(this.props);
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

    let scrollAnchor = document.getElementsByClassName('scrollhere')[0];
    setTimeout(function() { scrollAnchor.scrollIntoView();},10)
  }

  anxiety(props, i) {
    let condition = Math.cos(props.time) > Math.random() ;
    return condition && i%3 ? "ImagesAnxiety" : "ImagesNoAnxiety";
  }

  render() {
    let HomeData=[];
    let ProjectData=[];
    let InstaData=[];

    for (let d = 0; d<this.state.home.length; d++) {
      HomeData.push({
        imageURL: this.state.home[d]["gsx$imagesource"]["$t"] ? this.state.home[d]["gsx$imagesource"]["$t"] : null,
        type:  this.state.home[d]["gsx$type"]["$t"],
        name:  this.state.home[d]["gsx$projectname"]["$t"],
        ID:  this.state.home[d]["gsx$id"]["$t"],
        priority:  this.state.home[d]["gsx$priority"]["$t"],
        soundcloud: this.state.home[d]["gsx$iframelink"]["$t"],
        details1: this.state.home[d]["gsx$projectdata1"]["$t"] ? this.state.home[d]["gsx$projectdata1"]["$t"] : null,
        details2: this.state.home[d]["gsx$projectdata2"]["$t"],
        details3: this.state.home[d]["gsx$projectdata3"]["$t"],
        details4: this.state.home[d]["gsx$projectdata4"]["$t"],
        detailslink: this.state.home[d]["gsx$projectdatalink"]["$t"]
       })
    }

    let HomeDataSorted = HomeData.sort((a,b)=> a.priority - b.priority);

    for (let d = 0; d<this.state.project.length; d++) {
      ProjectData.push({
        imageURL: this.state.project[d]["gsx$imagesource"]["$t"] ? this.state.project[d]["gsx$imagesource"]["$t"] : null,
        caption:  this.state.project[d]["gsx$caption"]["$t"],
        name:  this.state.project[d]["gsx$projectname"]["$t"],
        ID:  this.state.project[d]["gsx$id"]["$t"],
        doc: this.state.project[d]["gsx$iframelink"]["$t"]
       })
    }

    for (let d = 0; d<this.state.insta.length; d++) {
      InstaData.push({
        imageURL: this.state.insta[d]["images"]["standard_resolution"]["url"],
        details1: this.state.insta[d]["caption"] != null ? this.state.insta[d]["caption"]["text"] : null,
        detailslink: this.state.insta[d]["link"]
       })

    }

    let numberOfInsta = HomeDataSorted.filter((d) => d.ID === "Instagram");
    let indexInsta = 0;
    for (let d in HomeDataSorted) {
      if (HomeDataSorted[d].ID ==="Instagram" && InstaData[indexInsta] !== undefined) {
        indexInsta < numberOfInsta.length ? HomeDataSorted[d].imageURL = InstaData[indexInsta].imageURL : 1;
        indexInsta < numberOfInsta.length ? HomeDataSorted[d].details1 = InstaData[indexInsta].details1 : 1;
        indexInsta < numberOfInsta.length ? HomeDataSorted[d].detailslink = InstaData[indexInsta].detailslink : 1;
        ++indexInsta;
      }  
    }

    let ProjectDataCurrent = ProjectData.filter((d)=> d.ID === this.state.current);

    let classProject = this.state.projectsHidden ? 'ProjectDataIsHidden' : 'ProjectData ProjectDataIsVisible';
    let classButton = this.state.projectsHidden ? 'Button ButtonIsHidden' : 'Button ButtonIsVisible';
    let classHome = this.state.homeHidden ? 'HomeDataIsHidden' : 'HomeData HomeDataIsVisible';
    
    return (
      <div className="App">
        <div className="scrollhere"></div>
        <Title />
        <div onClick={this.backHome} className={classButton}>.</div>
        <div className={classHome}> 
          {HomeDataSorted.map((d,i) => <Item imagesAnxiety={this.anxiety(this.props, i)} selectItem={this.selectItem} key={i} id={d.ID} name={d.name} type={d.type} imageURL={d.imageURL} soundcloud={d.soundcloud} details1={d.details1} details2={d.details2} details3={d.details3} details4={d.details4} detailslink={d.detailslink} /> )} 
        </div>
        <div className={classProject}> 
          {ProjectDataCurrent.map((d,i) => <Project key={i} id={d.ID} name={d.name} caption={d.caption} type={d.type} imageURL={d.imageURL} doc={d.doc}  /> )} 
        </div>
        <div className="Footer"><a href="https://kallirroi.github.io/K/" target="_blank">Kalli</a> made this website</div>
      </div>
    );
  }
}

export default GameLoop(App);