import React from 'react';
import logo from './logo.svg';
import './App.css';
// import {PythonShell} from 'python-shell';
// const { ipcRenderer } = require('electron');

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

/*
// let script_path = 'C:/Users/Bramw/Desktop/Fall19/Research/code/electron-react-boilerplate-1/scripts/pythonNAO.py';
  // PythonShell.run(script_path, null, function (err) {
  //   if (err) throw err;
  //   console.log('finished');
  // });
  // let py_string = 'from naoqi import ALProxy;tts=ALProxy("ALTextToSpeech", "10.0.1.133", 9559);tts.say("Hi Jean!")';

  // PythonShell.runString(py_string, null, function (err) {
  //   if (err) throw err;
  //   console.log('finished');
  // });

  // Some data that will be sent to the main process
  let Data = {
      message: "Hi",
      someData: "Let's go"
  };

  // Send information to the main process
  // if a listener has been set, then the main process
  // will react to the request !
  ipcRenderer.send('request-mainprocess-action', Data);
  */