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
}