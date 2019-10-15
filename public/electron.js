const electron = require('electron');
const path = require('path');
const url = require('url');

const { ipcMain } = electron;
const { PythonShell } = require('python-shell')

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
        //nodeIntegration: true,
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

ipcMain.on('request-mainprocess-speak', (event) => {
  console.log('Main received request to speak from renderer');

  /*
  //can set options for pythonShell
  let options = {
    mode: 'text',
    pythonPath: 'C:/Users/Bramw/AppData/Local/Programs/Python/',
    pythonOptions: ['-u'], // get print results in real-time
    scriptPath: 'C:/Users/Bramw/Desktop/Fall19/Research/code/pythonScript/',
    args: ['value1', 'value2', 'value3']
  };

  //can run python code from a string
  let py_string = 'from naoqi import ALProxy;tts=ALProxy("ALTextToSpeech", "10.0.1.133", 9559);tts.say("Hi Jean!")';
  PythonShell.runString(py_string, null, function (err, output) {
    if (err) throw err;
    console.log('output of python code:', output);
  });

  //can set specific python path to use
  PythonShell.defaultPythonPath = 'C:/Users/Bramw/AppData/Local/Programs/Python/';

  //can show the current python path and version
  console.log('default electron python path:',PythonShell.getPythonPath());
  PythonShell.getVersion().then((output)=>{
    console.log('default electron python version:',output.stdout)
    console.log('default electron python version error:',output.stderr)
  })
  */
 
  let script_path = 'C:/Users/Bramw/Desktop/Fall19/Research/code/pythonScript/pythonNAO.py';
  PythonShell.run(script_path, null, function (err, output) {
    if (err) throw err;
    console.log('output of python script:', output);
  });
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