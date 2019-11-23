const { PythonShell } = require('python-shell');

/** @class Class representing the facade for electron.js to run the python scripts
 * @todo robot may FALL when running movement scripts on subsequent connections of app 
 */
class PythonNAO {

  /**
   * Creates an instance of the facade PythonNAO
   * 
   * @constructor
   * @author Dxnni
   * @property {string} IP The IP address used to connect to robot for every script
   * @property {string} scriptsPath The relative path to where the python scripts to be used are maintained
   */
  constructor(){
    this.IP = '0';
    this.scriptsPath = './scripts/';
  }
  
  /**
   * Updates IP address class variable
   * 
   * @author Dxnni
   * @param {string} newIP The IP address given by robot to connect
   * 
   */
  setIP(newIP){
    console.log('PythonNAO: Updated IP to:', newIP);
    this.IP = newIP;    
  }

  /**
   * Runs given python script and returns its output to the sender
   * 
   * @author Dxnni
   * @param {string} script Desired name of script to run
   * @param {array} args Desired array of any inputs for given script
   * @param {Electron.IpcMainEvent.sender} sender The reference to object that created the request to electron
   * 
   */
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

  /**
   * Re-arranges arguments to script to be in format desired by script
   * 
   * @author Dxnni
   * @param {string} script Name of script to be ran
   * @param {array} args Array of arguments to pass to script
   * @return {array} Correct format of arguments for desired script
   * 
   * @todo If multiple args to a script, try not to have arguments hardcoded in a certain order
   * 
   */
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

  /* LEGACY CODE:

  // @deprecated use runScript('tts',...)  instead
  textToSpeech(text){
    if(text){
      console.log('PythonNAO: Requesting Python for tts: '+text);
     
      PythonShell.run('./scripts/'+'tts.py', {args:['-t'+text]}, (err, output) => {
          if (err) throw err;
          console.log('PythonNAO: Successfully ran tts.py:\n'+output);
      });
    }   
  }

  // @deprecated use runScript('posture',...)  instead
  goToPost(post){
    if(post){
      console.log('PythonNAO: Requesting Python to change posture: '+post);

      PythonShell.run('./scripts/'+'posture.py', {args:[post]}, (err, output) => {
          if (err) throw err;
          console.log('PythonNAO: Successfully ran posture.py:\n'+output);
      });
    }
  }

  // @deprecated use runScript('walk',...)  instead
  walk(secs){
    if(secs){
      console.log('PythonNAO: Requesting Python to walk: '+secs+' secs');

      PythonShell.run('./scripts/'+'walk.py', {args:[secs]}, (err, output) => {
          if (err) throw err;
          console.log('PythonNAO: Successfully ran walk.py:\n'+output);
      });
    }
  }

  // @deprecated use runScript('sonar',...)  instead
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
  
  // @deprecated use runScript('record',...)  instead
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
  
  // @deprecated use runScript('battery',...)  instead
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

  // @deprecated use runScript('touch',...)  instead
  enableTouch(){
    console.log('PythonNAO: Requesting Python to enable touch');

    // TODO: add input (input is secs) to touch.py script and figure out how to disable touch.py script.
    PythonShell.run('./scripts/'+'touch.py', {args:[]}, (err, output) => {
        if (err) throw err;
        console.log('PythonNAO: Successfully ran touch.py:\n'+output);
    });
  }
  
  // @deprecated use runScript('playkonpa',...)  instead
  playkonpa(){
    console.log('PythonNAO: Requesting Python to play konpa');
    
    PythonShell.run('./scripts/'+'playKonpa.py', {args:[]}, (err, output) => {
        if (err) throw err;
        console.log('PythonNAO: Successfully ran playKonpa.py:\n'+output);
    });
  }

  // @deprecated use runScript('stopmusic',...)  instead
  stopMusic(){
    console.log('PythonNAO: Requesting Python to stop music');
    
    PythonShell.run('./scripts/'+'stopmusic.py', {args:[]}, (err, output) => {
        if (err) throw err;
        console.log('PythonNAO: Successfully ran stopmusic.py:\n'+output);
    });
  }

  // @deprecated use runScript('chacha',...)  instead
  chacha(){
    console.log('PythonNAO: Requesting Python to dance chacha');
    
    PythonShell.run('./scripts/'+'chacha.py', {args:[]}, (err, output) => {
        if (err) throw err;
        console.log('PythonNAO: Successfully ran chacha.py:\n'+output);
    });
  }

  */