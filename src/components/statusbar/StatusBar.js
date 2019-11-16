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
    batteryUpdate = (val) => {
        console.log('React: Output from battery script:\n', val);
        
        this.setState({
            battery: val[val.length-1]
        });
    }

    runTouch = (runTouch) => {
        let secs = 10;
        ElectronNAO.enableTouch(secs);
        this.setState({ runTouch });
    }

    getSonar = (getSonar) => {
        ElectronNAO.getSonar(this.sonarUpdate);
        this.setState({ getSonar });
    }

    getRecording = (getRecording) => {
        ElectronNAO.getRecording(this.recordUpdate);
        this.setState({ getRecording });
    }

    // TODO: create getBattery
    getBattery = () => {
        ElectronNAO.getBattery(this.batteryUpdate);
    }

    playkonpa = () => {
        ElectronNAO.playkonpa();
    }

    stopMusic = () => {
        ElectronNAO.stopMusic();
    }

    chacha = () => {
        ElectronNAO.chacha();
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

                    <div className={styles.switch}>
                        <p>NABLE TOUCH</p>
                        <Switch onChange={this.runTouch} checked={this.state.runTouch} />
                        {/* <button onClick = {this.runTouch}>
                            ENABLE TOUCH
                        </button> */}
                    </div>
       
                    <div className={styles.switch}>
                        <p>GET SONAR</p>
                        <Switch onChange={this.getSonar} checked={this.state.getSonar} />

                        {/* <button onClick = {this.getSonar}>
                            GET SONAR
                        </button> */}
                    </div>
           
                    <div className={styles.switch}>
                        <p>GET RECORDING</p>
                        <Switch onChange={this.getRecording} checked={this.state.getRecording} />

                        {/* <button onClick = {this.getRecording}>
                            GET RECORDING
                        </button> */}
                    </div>

                </div>

                <div id={styles.bottom}>
                    <button
                            onClick = {this.getBattery}
                        >
                            GET BATTERY
                    </button>
                </div>

                <div id={styles.bottom}>
                    <button
                            onClick = {this.playkonpa}
                        >
                            Play konpa
                    </button>
                </div>

                <div id={styles.bottom}>
                    <button
                            onClick = {this.stopMusic}
                        >
                            Stop Music
                    </button>
                </div>

                <div id={styles.bottom}>
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