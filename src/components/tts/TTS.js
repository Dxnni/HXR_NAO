import React, {Component} from 'react';
import ElectronNAO from '../../ElectronNAO';

import styles from './TTS.module.css';

class TTS extends Component {

    tts = () => {
        let text = this.state.inputText;
        let num1 = this.state.num1;
        let num2 = this.state.num3;
        let num3 = this.state.num3;
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
            <div id={styles.tts}>
                
                <div id={styles.header}><h1>Text To Speech</h1></div>

                <div id={styles.tts_content}>
                    <form onSubmit={this.tts}> 
                        <input 
                            type="text"
                            name="inputText"
                            id={styles.tts_input} 
                            value={ this.state.inputText }
                            onChange={ this.inputChangeHandler }
                        />

                    {/* <fieldset> */}
                        {/* <legend>Selecting elements</legend> */}
                            {/* <p>
                                <label>Select list</label>
                                    <select id = "myList">
                                    <option value = "1">one</option>
                                    <option value = "2">two</option>
                                    <option value = "3">three</option>
                                    <option value = "4">four</option>
                                    <option value = "5">four</option>
                                    <option value = "4">four</option>
                                    <option value = "4">four</option>
                                    <option value = "4">four</option>
                                </select>
                            </p> */}
                    {/* </fieldset> */}

                        <button 
                            type="submit"
                            id={styles.button}
                            // onClick = {this.tts}
                        > 
                            SEND 
                        </button>
                    </form>

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
            </div>
        )
    }
}

export default TTS;