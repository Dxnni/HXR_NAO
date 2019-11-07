import isElectron from "is-electron";

// ElectronNAO is the facade for App.js/React to make requests to electron by calling provided functions.
export default class ElectronNAO {

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

    static enableTouch(secs){        
        if(isElectron() && secs){            
            console.log('ElectronNAO: Requesting Main to enable touch: '+secs+' secs');
            window.ipcRenderer.send('req-touch', secs);            
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

}