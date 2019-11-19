import React, {Component} from 'react';
import ElectronNAO from '../../ElectronNAO';

import styles from './TTS.module.css';

class TTS extends Component {

    tts = () => {
        let text = this.state.inputText;
        ElectronNAO.textToSpeech(text);
    }

    ip = () => {
        let text = this.state.ipText;
        ElectronNAO.textToSpeech(text);
    }

    state = {
        inputText: null,
        ipText: null,
    }

    inputChangeHandler = (event) => {
        this.setState({
            inputText: event.target.value,
        });
    }

    ipChangeHandler = (event) => {
        this.setState({
            ipText: event.target.value,
        });
    }
    
    render(){
        return (
            <div id={styles.tts_container}>

                <h3>Text To Speech</h3>

                <div>
                    <input 
                        type="text"
                        name="inputText"
                        id={styles.tts_input} 
                        value={ this.state.inputText }
                        onChange={ this.inputChangeHandler }
                    />

                    <button 
                        id={styles.button}
                        onClick = {this.tts}
                    > 
                        SEND 
                    </button>
                </div>

                <div>
                    <input 
                        type="text"
                        name="inputText"
                        id={styles.tts_input} 
                        value={ this.state.ipText}
                        onChange={ this.ipChangeHandler }
                    />

                    <button 
                        id={styles.button}
                        onClick = {this.ip}
                    > 
                        SEND 
                    </button>
                </div>

            </div>
        )
    }
}

export default TTS;