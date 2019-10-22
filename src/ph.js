import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ElectronNAO from './ElectronNAO';

class App extends Component {
    
  tts = () => {
    let text = 'Hi';
    ElectronNAO.textToSpeech(text);
  }

  count=0;
  changePost = () => {    
    if(this.count%2===0){
      ElectronNAO.goToPost('Crouch');
    }else{
      ElectronNAO.goToPost('StandInit');
    }
    this.count++;
    /*
      Possible Positions:
        Crouch,
        LyingBack,
        LyingBelly,
        Sit,
        SitRelax,
        Stand,
        StandInit,
        StandZero
    */    
  }

  runMove = () => {
    let script = 'move';
    let output = ElectronNAO.runScript(script);
    console.log('Output from script', script+'.py:\n', output);    
  }

  runSonar = () => {
    let script = 'sonar';
    ElectronNAO.runScript(script);
    window.ipcRenderer.on('req-script-output', (event, output) => {
      if(output){
        console.log('Output from script', script+'.py:\n', output);
      }
    })   
  }

  runVideo = () => {
    let script = 'video';
    let output = ElectronNAO.runScript(script);
    console.log('Output from script', script+'.py:\n', output);
  }

  runTouch = () => {
    let script = 'touch';
    let output = ElectronNAO.runScript(script);
    console.log('Output from script', script+'.py:\n', output);
  }

  render(){
    console.log('TOUCH NAO is still in progess and will continue running after enabled');
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>              
          <button
            onClick = {this.tts}
          > 
            SPEAK NAO!
          </button>
          <button
            onClick = {this.changePost}
          > 
            CROUCH NAO!
          </button>
          <button
            onClick = {this.runMove}
          > 
            FORWARD NAO!
          </button>
          <button
            onClick = {this.runSonar}
          > 
            SONAR NAO!
          </button>
          <button
            onClick = {this.runVideo}
          > 
            RECORD NAO!
          </button>
          <button
            onClick = {this.runTouch}
          > 
            TOUCH NAO!
          </button>

        </header>
      </div>
    );
  }
}

export default App;