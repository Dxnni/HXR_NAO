import React, { Component } from 'react';
import ElectronNAO from '../../ElectronNAO';

import Switch from "react-switch";

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
            battery: 0,
            runTouch: false,
            getSonar: false,
            getRecording: false,
            ipValue: null,
        };
    }
    
    handleIpInput = (event) => {
        this.setState({ipValue: event.target.value});
        this.props.onIpInput(this.state.ipValue);            
    }

    sonarUpdate = (val) => {
        console.log('React: Output from sonar script:\n', val);
        if(!val.error){      
            this.setState({
                sonarL: val.output.left,
                sonarR: val.output.right
            });
        }
    }

    recordUpdate = (val) => {
        console.log('React: Output from recording script:\n', val);
        if(!val.error){      
            this.setState({
                recordedFrames: val.output
            });
        }
    }

    batteryUpdate = (val) => {
        console.log('React: Output from battery script:\n', val);
        if(!val.error){      
            this.setState({
                battery: val.output
            });
        }
    }

    runTouch = (runTouch) => {
        ElectronNAO.runScript('touch', [], null);
        this.setState({ runTouch });
    }

    getSonar = (getSonar) => {
        ElectronNAO.runScript("sonar", [], this.sonarUpdate);
        this.setState({ getSonar });
    }

    getRecording = (getRecording) => {
        let secs = 5;
        ElectronNAO.runScript('record', [secs], this.recordUpdate);
        this.setState({ getRecording });
    }

    getBattery = () => {
        ElectronNAO.runScript('BATTERY', [], this.batteryUpdate);
    }

    playkonpa = () => {
        ElectronNAO.runScript('playKonpa', [], null);
    }

    stopMusic = () => {
        ElectronNAO.runScript('stopMusic', [], null);
    }

    chacha = () => {
        ElectronNAO.runScript('chacha', [], null);
    }


    render() {
        return (
            <div id={styles.statusbar}>
    
                <div id={styles.top}>
                    <div id={styles.battery}>
                        <p>{this.state.battery}%</p>
                        <img src={battery_icon}/>                   
                    </div>
    
                    <div id={styles.sensor_data}>
                        <div className={styles.sonar_data}>
                            <div>
                                <p className={styles.data}>{this.state.sonarL}</p>
                                <p className={styles.data_caption}>Sonar Left Data</p>                            
                            </div>

                            <div>
                                <p className={styles.data}>{this.state.sonarR}</p>
                                <p className={styles.data_caption}>Sonar Right Data</p>
                            </div>
                        </div>

                        <div>
                            <p className={styles.data}>{this.state.recordedFrames}</p>
                            <p className={styles.data_caption}>Recorded Frames</p>                            
                        </div>
                    </div>            
                </div>

                <div id={styles.bottom}>

                {/* <div>
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
                </div> */}

                    <div className={styles.switch}>
                        <p>ENABLE TOUCH</p>
                        <Switch onChange={this.runTouch} checked={this.state.runTouch} />
                    </div>

                    <button onClick = {this.getSonar}>
                        GET SONAR
                    </button>
               
                    <button onClick = {this.getRecording}>
                        GET RECORDING
                    </button>

                    <button
                            onClick = {this.getBattery}
                        >
                            GET BATTERY
                    </button>

                    <button
                            onClick = {this.playkonpa}
                        >
                            Play konpa
                    </button>

                    <button
                            onClick = {this.stopMusic}
                        >
                            Stop Music
                    </button>

                    <button
                            onClick = {this.chacha}
                        >
                            Dance Cha Cha
                    </button>

                </div>
    
            </div>
        )
    }
}

export default sidebar;