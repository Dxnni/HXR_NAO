import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import ElectronNAO from './ElectronNAO';


import logo, { ReactComponent } from './logo.svg';
import Home from './components/home/Home';
import Sidebar from './components/sidebar/Sidebar';
import StatusBar from './components/statusbar/StatusBar'
import TTS from './components/tts/TTS';
import Action from './components/movement/Actions';

import './App.css';



class App extends Component {

  state = {
    ipText: null,
  }

  setIp = (value) => {
    this.setState({ipText: value});
  } 

  render() {
    return (
      <BrowserRouter>

        <div className="App">

          <div id="sidebar">
            <Sidebar onIpInput={this.setIp}/>
          </div>

          <div id="section">
            <Route path='/' exact component={TTS} />
            <Route path='/actions' exact component={Action} />
            <Route path='/tts' exact component={TTS} />            
          </div>

          <div id="statusbar">
            <StatusBar/>
          </div>

        </div>

      </BrowserRouter>
    );
  }
}

export default App;
