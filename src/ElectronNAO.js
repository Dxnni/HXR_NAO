import isElectron from "is-electron";

/** @class Class representing the facade for App.js/React/UI to make requests to electron.js */
export default class ElectronNAO {

    /**
     * Makes request to update IP address
     * 
     * @author Dxnni
     * @param {string} newIP The IP address given by robot to connect
     * 
     */
    static setIP(newIP){
        if(isElectron()){
            console.log('ElectronNAO: Requesting Main to update IP to:', newIP);

            window.ipcRenderer.send('req-IP-update', newIP);            
        }
    }

    /**
     * Makes request to run a python script, creates listener for response, and return the response using a callback
     * 
     * @author Dxnni
     * @param {string} _script Desired name of script to run
     * @param {array} args Desired array of any inputs for given script
     * @param {function} callback Desired function to run when given script is completed
     * 
     * @todo Create proxy that controls the listeners created/needed so there are no duplicates
     * 
     */
    static runScript(_script, args, callback){        
        if(isElectron()){
            
            const script = _script.toLowerCase();

            console.log('ElectronNAO: Requesting Main to run script:', script);

            let request = {
                script: script,
                args: args
            };

            window.ipcRenderer.send('req-script', request);            

            //TODO: Create proxy that controls the listeners created/needed so there are no duplicates
            window.ipcRenderer.on('req-'+script+'-output', (event, _response) => {                               
                let response = _response;

                if(response.output){
                    response.output = this.parseOutput(script, response.output);
                }

                if(response.error){
                    console.log('ElectronNAO: Error results from PythonNAO:\n', response);
                }else{
                    console.log('ElectronNAO: Script results from PythonNAO:\n', response);
                }

                if(callback && response){
                    callback(response);
                }
            });
        }
    }

    /**
     * Re-arranges output from script to be in a more desirable format for UI
     * Only certain scripts give values needed for UI
     * 
     * @author Dxnni
     * @param {string} script Name of script that output is coming from
     * @param {array} output Array of information given from script
     * @return {any} Only the desired values for UI
     * 
     * @todo For sonar results, figure out if last index is actually for right sonar sensor
     * 
     */
    static parseOutput(script, output){
        const arrLen = output.length;
        let newOutput;
    
        switch(script){          
          case 'sonar' : {
            newOutput = {
                left: output[arrLen-2].substring(0,4),
                right: output[arrLen-1].substring(0,4)
            };
            break;
          }
          case 'record' : {
            newOutput = output[arrLen-1].substring(1,3);             
            break;
          }
          case 'battery' : {
            newOutput = output[arrLen-1].substring(0,2);             
            break;
          }          
          default : {
          }
        }    
        return newOutput;
    }
}

/* LEGACY CODE:

    // @deprecated use runScript('tts',...)  instead
    static textToSpeech(text){        
        if(isElectron() && text){            
            console.log('ElectronNAO: Requesting Main for tts: '+text);
            window.ipcRenderer.send('req-tts', text);            
        }
    }

    // @deprecated use runScript('posture',...)  instead
    static goToPost(post){        
        if(isElectron() && post){
            console.log('ElectronNAO: Requesting Main to change posture: '+post);
            window.ipcRenderer.send('req-post', post);
        }
    }

    // @deprecated use runScript('walk',...)  instead
    static walk(secs){        
        if(isElectron() && secs){            
            console.log('ElectronNAO: Requesting Main to walk: '+secs+' secs');
            window.ipcRenderer.send('req-walk', secs);            
        }
    }

    // @deprecated use runScript('touch',...)  instead
    static enableTouch(){        
        if(isElectron()){            
            console.log('ElectronNAO: Requesting Main to enable touch');
            window.ipcRenderer.send('req-touch');            
        }
    }

    // @deprecated use runScript('sonar',...)  instead
    static getSonar(callback){        
        if(isElectron()){            
            console.log('ElectronNAO: Requesting Main to get sonar values');
            window.ipcRenderer.send('req-sonar');
            
            window.ipcRenderer.on('req-sonar-output', (event, output) => {
                if(output){
                    console.log('ElectronNAO: Sonar results from PythonNAO:\n', output);
                    // parsing through script results for desired values
                    let len = output.length;
                    let result = [output[len-2], output[len-1]];
                    callback(result);
                    return result;
                }
            });
        }
    }

    // @deprecated use runScript('record',...)  instead
    static getRecording(callback){        
        if(isElectron()){            
            console.log('ElectronNAO: Requesting Main to get recording');
            window.ipcRenderer.send('req-record');
            
            window.ipcRenderer.on('req-record-output', (event, output) => {
                if(output){
                    console.log('ElectronNAO: Recording results from PythonNAO:\n', output);
                    // parsing through script results for desired values
                    let len = output.length;
                    let result = output[len-1];
                    callback(result);
                    return result;
                }
            });
        }
    }

    // @deprecated use runScript('battery',...)  instead
    static getBattery(callback){        
        if(isElectron()){            
            console.log('ElectronNAO: Requesting Main to get battery value');
            window.ipcRenderer.send('req-battery');
            
            window.ipcRenderer.on('req-battery-output', (event, output) => {
                if(output){
                    console.log('ElectronNAO: Battery result from PythonNAO:\n', output);
                    callback(output);
                    return output;
                }
            });
        }
    }

    // @deprecated use runScript('playkonpa',...)  instead
    static playkonpa(){        
        if(isElectron()){            
            console.log('ElectronNAO: Requesting Main to play konpa');
            window.ipcRenderer.send('req-konpa');            
        }
    }

    // @deprecated use runScript('stopmusic',...)  instead
    static stopMusic(){        
        if(isElectron()){            
            console.log('ElectronNAO: Requesting Main to stop music');
            window.ipcRenderer.send('req-stopmusic');            
        }
    }

    // @deprecated use runScript('chacha',...)  instead
    static chacha(){        
        if(isElectron()){            
            console.log('ElectronNAO: Requesting Main to dance chacha');
            window.ipcRenderer.send('req-chacha');            
        }
    }

    */