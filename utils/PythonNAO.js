const { PythonShell } = require('python-shell');

// PythonNAO is the facade for electron.js to use the python scripts by calling provided functions.
class PythonNAO {

  //TODO: replace hardcoded './scripts/' to be relative
  //TODO: take IP input for all scripts
  //URGENT: robot will move perfectly on first connection to app, but move improperly and FALL on subsequent connections of app

  static textToSpeech(robotIP, text){
    if(text){
      console.log('PythonNAO: Requesting Python for tts: '+text);
     
      PythonShell.run('./scripts/'+'tts.py', {args:[robotIP, text]}, (err, output) => {

          if (err) throw err;
          console.log('PythonNAO: Successfully ran tts.py:\n'+output);
      });
    }   
  }

  static goToPost(robotIP, post){
    if(post){
      console.log('PythonNAO: Requesting Python to change posture: '+post);

      PythonShell.run('./scripts/'+'posture.py', {args:[robotIP, post]}, (err, output) => {
          if (err) throw err;
          console.log('PythonNAO: Successfully ran posture.py:\n'+output);
      });
    }
  }

  static walk(robotIP, secs){
    if(secs){
      console.log('PythonNAO: Requesting Python to walk: '+secs+' secs');

      PythonShell.run('./scripts/'+'walk.py', {args:[robotIP, secs]}, (err, output) => {
          if (err) throw err;
          console.log('PythonNAO: Successfully ran walk.py:\n'+output);
      });
    }
  }

  static enableTouch(robotIP, secs){
    if(secs){
      console.log('PythonNAO: Requesting Python to enable touch: '+secs+' secs');

      // TODO: add input (input is secs) to touch.py script and figure out how to disable touch.py script.
      PythonShell.run('./scripts/'+'touch.py', {args:[robotIP]}, (err, output) => {
          if (err) throw err;
          console.log('PythonNAO: Successfully ran touch.py:\n'+output);
      });
    }
  }

  static getSonar(robotIP, sender){
    if(sender){
      console.log('PythonNAO: Requesting Python to get sonar values');

      PythonShell.run('./scripts/'+'sonar.py', {args:[robotIP]}, (err, output) => {
          if (err) throw err;
          console.log('PythonNAO: Successfully ran sonar.py:\n'+output);
          sender.send('req-sonar-output', output);
      });
    }
  }

  static getRecording(robotIP, sender){
    if(sender){
      console.log('PythonNAO: Requesting Python to get recording');

      PythonShell.run('./scripts/'+'record.py', {args:[robotIP]}, (err, output) => {
          if (err) throw err;
          console.log('PythonNAO: Successfully ran record.py:\n'+output);
          sender.send('req-record-output', output);
      });
    }
  }

  static getBattery(robotIP, sender){
    if(sender){
      console.log('PythonNAO: Requesting Python for battery charge');
     
      PythonShell.run('./scripts/'+'battery.py', {args:[robotIP]}, (err, output) => {
          if (err) throw err;
          console.log('PythonNAO: Successfully ran battery.py:\n'+output);
          sender.send('req-battery-output', output);
      });
    }
  }

  static playkonpa(robotIP){
    console.log('PythonNAO: Requesting Python to play konpa');
    
    PythonShell.run('./scripts/'+'playKonpa.py', {args:[robotIP]}, (err, output) => {
        if (err) throw err;
        console.log('PythonNAO: Successfully ran playKonpa.py:\n'+output);
    });
  }

  static stopMusic(robotIP){
    console.log('PythonNAO: Requesting Python to stop music');
    
    PythonShell.run('./scripts/'+'stopmusic.py', {args:[robotIP]}, (err, output) => {
        if (err) throw err;
        console.log('PythonNAO: Successfully ran stopmusic.py:\n'+output);
    });
  }

  static chacha(robotIP){
    console.log('PythonNAO: Requesting Python to dance chacha');
    
    PythonShell.run('./scripts/'+'chacha.py', {args:[robotIP]}, (err, output) => {
        if (err) throw err;
        console.log('PythonNAO: Successfully ran chacha.py:\n'+output);
    });
  }

  // TODO: create getBattery(sender) and battery.py script

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