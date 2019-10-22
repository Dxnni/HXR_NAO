const { PythonShell } = require('python-shell');

class PythonNAO {

  //TODO: replace hardcoded full_path to be relative
  //URGENT: robot will move perfectly on first connection to app, but move improperly and fall on subsequent connections of app

  script_path = '../scripts/';

  static textToSpeech(text){
    if(text){
      console.log('Main: Requesting Python for tts: '+text);

      const full_path = 'C:/Users/Bramw/Desktop/Fall19/Research/code/electron-react-boilerplate-1/scripts/';
      PythonShell.run(full_path+'tts.py', {args:[text]}, (err, output) => {
          if (err) throw err;
          console.log('Main: Successfully ran tts.py:\n'+output);
      });
    }   
  }

  static goToPost(post){
    if(post){
      console.log('Main: Requesting Python to change posture: '+post);

      const full_path = 'C:/Users/Bramw/Desktop/Fall19/Research/code/electron-react-boilerplate-1/scripts/';
      PythonShell.run(full_path+'posture.py', {args:[post]}, (err, output) => {
          if (err) throw err;
          console.log('Main: Successfully ran posture.py:\n'+output);
      });
    }
  }

  static runScript(scriptName){
    let result = [];
    if(scriptName){
      if((scriptName === 'move') || (scriptName === 'sonar') || (scriptName === 'touch') || (scriptName === 'video')){
        console.log('Main: Requesting Python to run script: '+scriptName);

        const full_path = 'C:/Users/Bramw/Desktop/Fall19/Research/code/electron-react-boilerplate-1/scripts/';
        PythonShell.run(full_path+scriptName+'.py', null, (err, output) => {
            if (err) throw err;
            console.log('Main: Successfully ran '+scriptName+'.py:\n'+output);
            result = output;
        });
      }
    }
    return result;
  }
}

module.exports = PythonNAO;

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
 
  //can run python from a script
  let script_path = 'C:/Users/Bramw/Desktop/Fall19/Research/code/pythonScript/pythonNAO.py';
  PythonShell.run(script_path, null, function (err, output) {
    if (err) throw err;
    console.log('output of python script:', output);
  });
  */