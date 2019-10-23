import React, {Component} from 'react';
import ElectronNAO from '../../ElectronNAO';

import Action from './action/Action';
import styles from './Actions.module.css';

import stand_icon from '../../assets/icons/postures/stand.svg';
import crouch_icon from '../../assets/icons/postures/crouch.svg';
import lying_back_icon from '../../assets/icons/postures/lying.svg';

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
            <div id={styles.actions} >

                <h1>ACTIONS</h1>

                <div id={styles.action_container} >
                    <div
                        id={styles.action}
                        onClick={this.standInit}
                    >
                        <img src={stand_icon}/>
                        <p>Stand Init</p>
                    </div>

                    <div
                        id={styles.action}
                        onClick={this.crouch}
                    >
                        <img src={crouch_icon}/>
                        <p>Crouch</p>
                    </div>

                    <div
                        id={styles.action}
                        onClick={this.lyingBack}
                    >
                        <img src={lying_back_icon}/>
                        <p>Lying Back</p>
                    </div>
                </div>

                <div id={styles.move}>
                    <p>Move Foward</p>

                    <div id={styles.move_content}>
                        {/* <input 
                            type="text"
                            name="steps"
                            id={styles.tts_input} 
                            value={ this.state.steps }
                            onChange={ this.stepsChangeHandler }
                        /> */}

                        <button 
                            id={styles.button}
                            onClick = {this.move}
                        > 
                            MOVE
                        </button>
                    </div>

                </div>
            </div>
        )
    }
}

export default Actions;