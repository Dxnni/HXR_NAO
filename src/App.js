import React from 'react';
import logo from './logo.svg';
import './App.css';
import isElectron from 'is-electron';

function App() {

  const speak = () => {
    // Send information to the main process
    // if a listener has been set, then the main process
    // will react to the request !
    if(isElectron()){
      console.log('Button Clicked on Renderer. Requesting main to speak');
      window.ipcRenderer.send('request-mainprocess-speak');
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}

        <button
          onClick = {speak}
        > 
          SPEAK NAO!
        </button>

      </header>
    </div>
  );
}

export default App;