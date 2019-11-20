import isElectron from "is-electron";

// ElectronNAO is the facade for App.js/React to make requests to electron by calling provided functions.
export default class ElectronNAO {

    static setIP(newIP){
        if(isElectron()){
            console.log('ElectronNAO: Requesting Main to update IP to:', newIP);

            window.ipcRenderer.send('req-IP-update', newIP);            
        }
    }

    static runScript(_script, args, callback){        
        if(isElectron()){
            
            let script = _script.toLowerCase();

            console.log('ElectronNAO: Requesting Main to run script:', script);

            let request = {
                script: script,
                args: args
            };

            window.ipcRenderer.send('req-script', request);            

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

                if(callback){
                    callback(response);
                }
            });
        }
    }

    static textToSpeech(text){        
        if(isElectron() && text){            
            console.log('ElectronNAO: Requesting Main for tts: '+text);
            window.ipcRenderer.send('req-tts', text);            
        }
    }

    static goToPost(post){        
        if(isElectron() && post){
            console.log('ElectronNAO: Requesting Main to change posture: '+post);
            window.ipcRenderer.send('req-post', post);
        }
    }

    static walk(secs){        
        if(isElectron() && secs){            
            console.log('ElectronNAO: Requesting Main to walk: '+secs+' secs');
            window.ipcRenderer.send('req-walk', secs);            
        }
    }

    static enableTouch(){        
        if(isElectron()){            
            console.log('ElectronNAO: Requesting Main to enable touch');
            window.ipcRenderer.send('req-touch');            
        }
    }

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

    // TODO: create getBattery(callback)
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

    static playkonpa(){        
        if(isElectron()){            
            console.log('ElectronNAO: Requesting Main to play konpa');
            window.ipcRenderer.send('req-konpa');            
        }
    }

    static stopMusic(){        
        if(isElectron()){            
            console.log('ElectronNAO: Requesting Main to stop music');
            window.ipcRenderer.send('req-stopmusic');            
        }
    }

    static chacha(){        
        if(isElectron()){            
            console.log('ElectronNAO: Requesting Main to dance chacha');
            window.ipcRenderer.send('req-chacha');            
        }
    }

    static parseOutput(script, output){
        const arrLen = output.length;
        let newOutput;
    
        switch(script){          
          case 'sonar' : {
            newOutput = [output[arrLen-2], output[arrLen-1]];
            break;
          }
          case 'record' : {
            newOutput = output[arrLen-1];             
            break;
          }          
          default : {
          }
        }    
        return newOutput;
    }
}