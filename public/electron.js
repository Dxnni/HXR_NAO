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

// Listener for tts functionality
ipcMain.on('req-tts', (event, robotIP, text) => {
  if(text){
    PythonNAO.textToSpeech(robotIP, text);
  }
});

// Listener for goToPost functionality
ipcMain.on('req-post', (event, robotIP, post) => {
  if(post){
    PythonNAO.goToPost(robotIP, post);
  }
});

// Listener for walking functionality
ipcMain.on('req-walk', (event, robotIP, secs) => {
  if(secs){
    PythonNAO.walk(robotIP, secs);
  }
});

// Listener for touch functionality
ipcMain.on('req-touch', (event, robotIP, secs) => {
  if(secs){
    PythonNAO.enableTouch(robotIP, secs);
  }
});

// Listener for sonar functionality
ipcMain.on('req-sonar', (event, robotIP) => {
  PythonNAO.getSonar(event.sender, robotIP);
});

// Listener for recording functionality
ipcMain.on('req-record', (event, robotIP) => {
  PythonNAO.getRecording(event.sender, robotIP);
});

// Listener for getBattery
ipcMain.on('req-battery', (event, robotIP) => {
  PythonNAO.getBattery(event.sender, robotIP);
});

ipcMain.on('req-konpa', (event, robotIP) => {
    PythonNAO.playkonpa(robotIP);
});

ipcMain.on('req-stopmusic', (event, robotIP) => {
  PythonNAO.stopMusic(robotIP);
});

ipcMain.on('req-chacha', (event, robotIP) => {
  PythonNAO.chacha(robotIP);
});

// // Listener for script functionality
// ipcMain.on('req-script', (event, script) => {
//   if(script){
//     //TODO: get output from script in PythonNAO to the UI
//     //TODO: theory-output is always undefined when ran because it doesn't wait for runScript to finish
//     PythonNAO.runScript(script, event.sender);
//     //console.log('Electron.js:', script+'.py output:\n', output);
//     //event.sender.send('req-script-output', output);
//     //ipcMain.send('req-script-output', output);
//   }
// });

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