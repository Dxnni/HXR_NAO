const electron = require('electron');
const path = require('path');
const url = require('url');

const { ipcMain } = electron;
const PythonNAO = require('../utils/PythonNAO');

const { app } = electron;
const { BrowserWindow } = electron;

let mainWindow;

function createWindow() {
  const startUrl = process.env.DEV
    ? 'http://localhost:3000'
    : url.format({
        pathname: path.join(__dirname, '/../build/index.html'),
        protocol: 'file:',
        slashes: true,
      });
  mainWindow = new BrowserWindow(
    {
      webPreferences: {
        preload: __dirname + '/preload.js'
      }
    }
  );

  mainWindow.loadURL(startUrl);
  process.env.DEV && mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
}

ipcMain.on('req-tts', (event, text) => {
  if(text){
    PythonNAO.textToSpeech(text);
  }
});

ipcMain.on('req-post', (event, post) => {
  if(post){
    PythonNAO.goToPost(post);
  }
});

ipcMain.on('req-script', (event, script) => {
  if(script){
    //TODO: get output from script in PythonNAO to the UI
    //TODO: theory-output is always undefined when ran because it doesn't wait for runScript to finish
    let output = PythonNAO.runScript(script, event.sender);
    //console.log('Electron.js:', script+'.py output:\n', output);
    //event.sender.send('req-script-output', output);
    //ipcMain.send('req-script-output', output);
  }
});

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});