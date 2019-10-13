const electron = require('electron');
const path = require('path');
const url = require('url');
// const {PythonShell} = require('python-shell')
// const {ipcMain} = require('electron');

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
  mainWindow = new BrowserWindow();

  mainWindow.loadURL(startUrl);
  process.env.DEV && mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
}

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

/*
// Attach listener in the main process with the given ID
ipcMain.on('request-mainprocess-action', (event, arg) => {
  // Displays the object sent from the renderer process:
  //{
  //    message: "Hi",
  //    someData: "Let's go"
  //}
  console.log(
      arg
  );
  console.log('TESSSSSSSSSSSSSSSSSSSSSSSSSSSST');

});
  // let py_string = 'from naoqi import ALProxy;tts=ALProxy("ALTextToSpeech", "10.0.1.133", 9559);tts.say("Hi Jean!")';

  // PythonShell.runString(py_string, null, function (err) {
  //   if (err) throw err;
  //   console.log('finished');
  // });
*/