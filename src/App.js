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
  render() {
    return (
      <BrowserRouter>

        <div className="App">
          <Sidebar/>
          <Route path='/' exact component={Home} />
          <Route path='/actions' exact component={Action} />
          <Route path='/tts' exact component={TTS} />
          <StatusBar/>
        </div>

      </BrowserRouter>
    );
  }
}

export default App;
