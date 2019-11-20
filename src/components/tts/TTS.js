import React, {Component} from 'react';
import ElectronNAO from '../../ElectronNAO';

import styles from './TTS.module.css';

class TTS extends Component {

    tts = () => {
        let text = this.state.inputText;
        // let num1 = this.state.num1;
        // let num2 = this.state.num3;
        // let num3 = this.state.num3;
        ElectronNAO.textToSpeech(text);
    }

    ip = () => {
        let text = this.state.ipText;
        ElectronNAO.setIP(text);
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
            <div id={styles.tts}>
                
                <div id={styles.header}><h1>Text To Speech</h1></div>

                <div id={styles.tts_content}>

                    <div className={styles.input}>
                        <h3>Speech Input</h3>
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

                    <div className={styles.input}>
                        <h3>IP Input</h3>
                        <input 
                            type="text"
                            name="inputText"
                            id={styles.tts_input} 
                            value={ this.state.ipText }
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
            </div>
        )
    }
}

export default TTS;