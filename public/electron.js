const electron = require('electron');
const path = require('path');
const url = require('url');

const { ipcMain } = electron;
const _PythonNAO = require('../utils/PythonNAO');

const { app } = electron;
const { BrowserWindow } = electron;

let mainWindow;
const PythonNAO = new _PythonNAO();

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

/**
 * Electron listener to update IP address
 */
ipcMain.on('req-IP-update', (event, newIP) => {  
  PythonNAO.setIP(newIP);
});

/**
 * Electron listener to run a python script
 */
ipcMain.on('req-script', (event, request) => {  
  PythonNAO.runScript(request.script, request.args, event.sender);
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

/* LEGACY CODE: 

// @deprecated use ipcMain.on('req-script',...)  instead
// Listener for tts functionality
ipcMain.on('req-tts', (event, text) => {
  if(text){
    PythonNAO.textToSpeech(text);
  }
});

// @deprecated use ipcMain.on('req-script',...)  instead
// Listener for goToPost functionality
ipcMain.on('req-post', (event, post) => {
  if(post){
    PythonNAO.goToPost(post);
  }
});

// @deprecated use ipcMain.on('req-script',...)  instead
// Listener for walking functionality
ipcMain.on('req-walk', (event, secs) => {
  if(secs){
    PythonNAO.walk(secs);
  }
});

// @deprecated use ipcMain.on('req-script',...)  instead
// Listener for touch functionality
ipcMain.on('req-touch', (event, secs) => {
  if(secs){
    PythonNAO.enableTouch(secs);
  }
});

// @deprecated use ipcMain.on('req-script',...)  instead
// Listener for sonar functionality
ipcMain.on('req-sonar', (event) => {
  PythonNAO.getSonar(event.sender);
});

// @deprecated use ipcMain.on('req-script',...)  instead
// Listener for recording functionality
ipcMain.on('req-record', (event) => {
  PythonNAO.getRecording(event.sender);
});

// @deprecated use ipcMain.on('req-script',...)  instead
// Listener for getBattery
ipcMain.on('req-battery', (event) => {
  PythonNAO.getBattery(event.sender);
});

// @deprecated use ipcMain.on('req-script',...)  instead
// Listener for konpaMusic
ipcMain.on('req-konpa', (event) => {
    PythonNAO.playkonpa();
});

// @deprecated use ipcMain.on('req-script',...)  instead
// Listener for stopMusic
ipcMain.on('req-stopmusic', (event) => {
  PythonNAO.stopMusic();
});

// @deprecated use ipcMain.on('req-script',...)  instead
// Listener for chachaDance
ipcMain.on('req-chacha', (event) => {
  PythonNAO.chacha();
});

*/