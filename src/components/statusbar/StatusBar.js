import React, { Component } from 'react';
import ElectronNAO from '../../ElectronNAO';


import action_icon from '../../assets/icons/action.png'

import styles from './StatusBar.module.css'

import battery_icon from '../../assets/icons/battery.svg'

class sidebar extends Component {

    constructor(props){
        super(props);
        this.state = {            
            sonarL: 0,
            sonarR: 0,
            recordedFrames: 0,
            battery: 80
        };
    }

    sonarUpdate = (val) => {
        console.log('React: Output from sonar script:\n', val);
        this.setState({
            sonarL: val[0],
            sonarR: val[1]
        });
    }

    recordUpdate = (val) => {
        console.log('React: Output from recording script:\n', val);
        this.setState({
            recordedFrames: val[1]+val[2]
        });
    }

    //TODO: create batteryUpdate(val)
    
    runTouch = () => {
        let secs = 10;
        ElectronNAO.enableTouch(secs);
    }

    getSonar = () => {
        ElectronNAO.getSonar(this.sonarUpdate);
    }

    getRecording = () => {
        ElectronNAO.getRecording(this.recordUpdate);
    }

    // TODO: create getBattery
    
    render() {
        // TODO: call getBattery
        return (
            <div id={styles.statusbar}>
    
                <div id={styles.top}>
    
                    <div id={styles.battery}>
                        <div id={styles.battery_content}>
                            <p>{this.state.battery}%</p>
                            <img src={battery_icon}/>                   
                        </div>
                    </div>
    
                    <div>
                        <p>{this.state.sonarL}</p>
                        <p>{this.state.sonarR}</p>
                        <p>NAO Sonar Data</p>

                        <p>{this.state.recordedFrames}</p>
                        <p>NAO Recorded Frames</p>
                    </div>            
                </div>

                <div id={styles.bottom}>
                    <button
                            onClick = {this.runTouch}
                        >
                            ENABLE TOUCH
                    </button>
                </div>

                <div id={styles.bottom}>
                    <button
                            onClick = {this.getSonar}
                        >
                            GET SONAR
                    </button>
                </div>

                <div id={styles.bottom}>
                    <button
                            onClick = {this.getRecording}
                        >
                            GET RECORDING
                    </button>
                </div>
    
            </div>
        )
    }
}

export default sidebar;