import isElectron from "is-electron";

// ElectronNAO is the facade for App.js/React to make requests to electron by calling provided functions.
export default class ElectronNAO {

    static textToSpeech(robotIP, text){        
        if(isElectron() && text){            
            console.log('ElectronNAO: Requesting Main for tts: '+text);
            window.ipcRenderer.send('req-tts', robotIP,  text);            
        }
    }

    static goToPost(robotIP, post){        
        if(isElectron() && post){
            console.log('ElectronNAO: Requesting Main to change posture: '+post);
            window.ipcRenderer.send('req-post', robotIP, post);
        }
    }

    static walk(robotIP, secs){        
        if(isElectron() && secs){            
            console.log('ElectronNAO: Requesting Main to walk: '+secs+' secs');
            window.ipcRenderer.send('req-walk', robotIP, secs);            
        }
    }

    static enableTouch(robotIP, secs){        
        if(isElectron() && secs){            
            console.log('ElectronNAO: Requesting Main to enable touch: '+secs+' secs');
            window.ipcRenderer.send('req-touch', robotIP, secs);            
        }
    }

    static getSonar(robotIP, callback){        
        if(isElectron()){            
            console.log('ElectronNAO: Requesting Main to get sonar values');
            window.ipcRenderer.send('req-sonar', robotIP);
            
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

    static getRecording(robotIP, callback){        
        if(isElectron()){            
            console.log('ElectronNAO: Requesting Main to get recording');
            window.ipcRenderer.send('req-record', robotIP);
            
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
    static getBattery(robotIP, callback){        
        if(isElectron()){            
            console.log('ElectronNAO: Requesting Main to get battery value');
            window.ipcRenderer.send('req-battery', robotIP);
            
            window.ipcRenderer.on('req-battery-output', (event, output) => {
                if(output){
                    console.log('ElectronNAO: Battery result from PythonNAO:\n', output);
                    callback(output);
                    return output;
                }
            });
        }
    }

    static playkonpa(robotIP){        
        if(isElectron()){            
            console.log('ElectronNAO: Requesting Main to play konpa');
            window.ipcRenderer.send('req-konpa', robotIP);            
        }
    }

    static stopMusic(robotIP){        
        if(isElectron()){            
            console.log('ElectronNAO: Requesting Main to stop music');
            window.ipcRenderer.send('req-stopmusic', robotIP);            
        }
    }

    static chacha(robotIP){        
        if(isElectron()){            
            console.log('ElectronNAO: Requesting Main to dance chacha');
            window.ipcRenderer.send('req-chacha', robotIP);            
        }
    }
}