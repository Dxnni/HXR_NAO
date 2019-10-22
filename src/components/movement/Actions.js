import React, {Component} from 'react';
import ElectronNAO from '../../ElectronNAO';

import Action from './action/Action';
import styles from './Actions.module.css';

class Actions extends Component {

    state = {
        steps: null,
    }

    standInit = () => {
        ElectronNAO.goToPost('StandInit');
    }

    crouch = () => {
        ElectronNAO.goToPost('Crouch');
    }

    lyingBack = () => {
        ElectronNAO.goToPost('LyingBack');
    }

    stepsChangeHandler = (event) => {
        this.setState({
            steps: event.target.value,
        });
    }
    
    move = () => {
        let script = 'move';
        let output = ElectronNAO.runScript(script);
        console.log('Output from script', script+'.py:\n', output);    
    }

    render(){
        return (
            <div id={styles.action_header} >

                <h1>ACTIONS</h1>

                <div id={styles.action_container} >

                    <button
                        id={styles.action}
                        onClick={this.standInit}
                    >
                        <Action/>
                    </button>

                    <button
                        id={styles.action}
                        onClick={this.crouch}
                    >
                        <Action/>
                    </button>

                    <button
                        id={styles.action}
                        onClick={this.lyingBack}
                    >
                        <Action/>
                    </button>

                    <input 
                        type="text"
                        name="steps"
                        id={styles.tts_input} 
                        value={ this.state.steps }
                        onChange={ this.stepsChangeHandler }
                    />

                    <button 
                        id={styles.button}
                        onClick = {this.move}
                    > 
                        SEND 
                    </button>

                </div>
            </div>
        )
    }
}

export default Actions;