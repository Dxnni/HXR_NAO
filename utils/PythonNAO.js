const { PythonShell } = require('python-shell');

// PythonNAO is the facade for electron.js to use the python scripts by calling provided functions.
class PythonNAO {
  //URGENT: robot will move perfectly on first connection to app, but move improperly and FALL on subsequent connections of app

  constructor(){
    this.IP = '0';
    this.scriptsPath = './scripts/';
  }
  
  setIP(newIP){
    console.log('PythonNAO: Updated IP to:', newIP);
    this.IP = newIP;    
  }

  runScript(script, args, sender){
    console.log('PythonNAO: Requesting Python to run script:', script);
    
    let response = {
      error: null,
      output: null
    };

    if(this.IP === '0' || this.IP === null){
      response.error = 'Error: IP address not set';
      console.log('PythonNAO error:\n', response);
      sender.send('req-'+script+'-output', response);
      return;
    }

    // console.log('args:',args);
    const fixedArgs = this.parseArgs(script, args);

    console.log('PythonNAO: Running '+script+'.py with args:',fixedArgs);                

    PythonShell.run(this.scriptsPath+script+'.py', {args:fixedArgs}, (err, output) => {

      response.error = err;
      response.output = output;
      
      if (err){
        console.log('PythonNAO: Error from '+script+'.py:\n', response);
      }else{
        console.log('PythonNAO: Successfully ran '+script+'.py:\n', response);                
      }  
      
      sender.send('req-'+script+'-output', response);
    });
  }

  textToSpeech(text){
    if(text){
      console.log('PythonNAO: Requesting Python for tts: '+text);
     
      PythonShell.run('./scripts/'+'tts.py', {args:['-t'+text]}, (err, output) => {
          if (err) throw err;
          console.log('PythonNAO: Successfully ran tts.py:\n'+output);
      });
    }   
  }

  goToPost(post){
    if(post){
      console.log('PythonNAO: Requesting Python to change posture: '+post);

      PythonShell.run('./scripts/'+'posture.py', {args:[post]}, (err, output) => {
          if (err) throw err;
          console.log('PythonNAO: Successfully ran posture.py:\n'+output);
      });
    }
  }

  walk(secs){
    if(secs){
      console.log('PythonNAO: Requesting Python to walk: '+secs+' secs');

      PythonShell.run('./scripts/'+'walk.py', {args:[secs]}, (err, output) => {
          if (err) throw err;
          console.log('PythonNAO: Successfully ran walk.py:\n'+output);
      });
    }
  }

  getSonar(sender){
    if(sender){
      console.log('PythonNAO: Requesting Python to get sonar values');

      PythonShell.run('./scripts/'+'sonar.py', {args:[]}, (err, output) => {
          if (err) throw err;
          console.log('PythonNAO: Successfully ran sonar.py:\n'+output);
          sender.send('req-sonar-output', output);
      });
    }
  }

  getRecording(sender){
    if(sender){
      console.log('PythonNAO: Requesting Python to get recording');

      PythonShell.run('./scripts/'+'record.py', {args:[]}, (err, output) => {
          if (err) throw err;
          console.log('PythonNAO: Successfully ran record.py:\n'+output);
          sender.send('req-record-output', output);
      });
    }
  }

  getBattery(sender){
    if(sender){
      console.log('PythonNAO: Requesting Python for battery charge');
     
      PythonShell.run('./scripts/'+'battery.py', {args:[]}, (err, output) => {
          if (err) throw err;
          console.log('PythonNAO: Successfully ran battery.py:\n'+output);
          sender.send('req-battery-output', output);
      });
    }
  }

  enableTouch(){
    console.log('PythonNAO: Requesting Python to enable touch');

    // TODO: add input (input is secs) to touch.py script and figure out how to disable touch.py script.
    PythonShell.run('./scripts/'+'touch.py', {args:[]}, (err, output) => {
        if (err) throw err;
        console.log('PythonNAO: Successfully ran touch.py:\n'+output);
    });
  }

  playkonpa(){
    console.log('PythonNAO: Requesting Python to play konpa');
    
    PythonShell.run('./scripts/'+'playKonpa.py', {args:[]}, (err, output) => {
        if (err) throw err;
        console.log('PythonNAO: Successfully ran playKonpa.py:\n'+output);
    });
  }

  stopMusic(){
    console.log('PythonNAO: Requesting Python to stop music');
    
    PythonShell.run('./scripts/'+'stopmusic.py', {args:[]}, (err, output) => {
        if (err) throw err;
        console.log('PythonNAO: Successfully ran stopmusic.py:\n'+output);
    });
  }

  chacha(){
    console.log('PythonNAO: Requesting Python to dance chacha');
    
    PythonShell.run('./scripts/'+'chacha.py', {args:[]}, (err, output) => {
        if (err) throw err;
        console.log('PythonNAO: Successfully ran chacha.py:\n'+output);
    });
  }

  parseArgs(script, args){
    const argLen = args.length;
    let newArgs = args;

    switch(script){      
      case 'tts' : {
        if(argLen >= 4){
          //TODO: not have hardcoded order
          newArgs.splice(0, 0, '--text');
          newArgs.splice(2, 0, '--pitch');
          newArgs.splice(4, 0, '--speed');
          newArgs.splice(6, 0, '--volume');
        }else{
          newArgs.splice(0, 0, '--text');
        }
        break;
      }
      case 'posture' : {
        if(argLen >= 1){
          newArgs.splice(0, 0, '--posture');
        }        
        break;
      }
      case 'walk' : {
        if(argLen >= 1){
          newArgs.splice(0, 0, '--secs');
        }
        break;
      }
      case 'record' : {
        if(argLen >= 1){
          newArgs.splice(0, 0, '--secs');
        }
        break;
      }
      default : {
      }
    }
    
    newArgs.splice(0, 0, '--ip', this.IP);

    return newArgs;
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