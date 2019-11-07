import React, { Component } from 'react';
import ElectronNAO from '../../ElectronNAO';


import action_icon from '../../assets/icons/action.png'

import styles from './StatusBar.module.css'

import battery_icon from '../../assets/icons/battery.svg'

class sidebar extends Component {

    constructor(props){
        super(props);
        this.state = {            
            sonar: 0,
            recordedFrames: 0,
            battery: 80
        };
    }

    sonarUpdate = (val) => {
        this.setState({
            sonar: val
        });
    }

    recordUpdate = (val) => {
        this.setState({
            recordedFrames: val
        });
    }

    //TODO: create batteryUpdate(val)
    
    runTouch = () => {
        let secs = 10;
        ElectronNAO.enableTouch(secs);
    }

    getSonar = () => {
        let output = ElectronNAO.getSonar(this.sonarUpdate);
        console.log('React: Output from sonar script:\n', output);
    }

    getRecording = () => {
        let output = ElectronNAO.getRecording(this.recordUpdate);
        console.log('React: Output from recording script:\n', output);
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
    
                    <div id={styles.status_code}>
                        <p>{this.state.sonar}</p>
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