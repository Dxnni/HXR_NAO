import React from 'react';
import logo from './logo.svg';
import './App.css';
import ElectronNAO from './ElectronNAO';

function App() {
  
  console.log('TOUCH NAO is still in progess and disabled');
  //TODO: fix error when desktop app opens, all buttons are clicked once
  
  const tts = (text) => {
    ElectronNAO.textToSpeech(text);
  }

  let count=0;
  const changePost = () => {    
    if(count%2===0){
      ElectronNAO.goToPost('Crouch');
    }else{
      ElectronNAO.goToPost('Stand');
    }
    count++;
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

  const runPy = (script) => {
    let output = ElectronNAO.runScript(script);
    console.log('Output from script', script+'.py:\n', output);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>              
        <button
          onClick = {tts('Danny, my pipeline works! You did it! Great job homie!')}
        > 
          SPEAK NAO!
        </button>
        <button
          onClick = {changePost()}
        > 
          CROUCH NAO!
        </button>
        <button
          onClick = {runPy('move')}
        > 
          FORWARD NAO!
        </button>
        <button
          onClick = {runPy('sonar')}
        > 
          SONAR NAO!
        </button>
        <button
          onClick = {runPy('video')}
        > 
          RECORD NAO!
        </button>
        <button
          // onClick = {runPy('touch')}
        > 
          TOUCH NAO!
        </button>

      </header>
    </div>
  );
}

export default App;