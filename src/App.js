import React, { Component } from 'react';
import {ItemList} from './ItemList';
import Item from './Item';
import {constructList} from './constructList';

import logo from './logo.svg';
import './App.css';


class App extends Component {
  constructor() {
    super();
  }

  render() {
    constructList(ItemList);
    console.log(ItemList)
    return (
      <div className="App">
           <img src={logo} className="App-logo" alt="logo" hidden />
           {ItemList.map((d,i) => <Item key={i} id={i} name={d.name} imageURL={d.imageURL} text={d.text} />)} 
      </div>
    );
  }
}

export default App;