import isElectron from "is-electron";

export default class ElectronNAO {

    static textToSpeech(text){        
        if(isElectron() && text){            
            console.log('Client requesting Main for tts: '+text);
            window.ipcRenderer.send('req-tts', text);            
        }
    }

    static goToPost(post){        
        if(isElectron() && post){
            //TODO: convert string to camel case
            console.log('Client requesting Main to change posture: '+post);
            window.ipcRenderer.send('req-post', post);
        }
    }

    static runScript(script){        
        if(isElectron() && script){
            if((script === 'move') || (script === 'sonar') || (script === 'touch') || (script === 'video')){
                console.log('Client requesting Main to run script: '+script);
                window.ipcRenderer.send('req-script', script);
            }

            window.ipcRenderer.on('req-script-output', (event, output) => {
                if(output){
                    return output;
                }
            })
        }
    }
}