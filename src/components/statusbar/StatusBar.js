import React, { Component } from 'react';
import ElectronNAO from '../../ElectronNAO';


import action_icon from '../../assets/icons/action.png'

import styles from './StatusBar.module.css'

import battery_icon from '../../assets/icons/battery.svg'

class sidebar extends Component {

    runTouch = () => {
        let script = 'touch';
        let output = ElectronNAO.runScript(script);
        console.log('Output from script', script+'.py:\n', output);
    }
    
    render() {
        return (
            <div id={styles.statusbar}>
    
                <div id={styles.top}>
    
                    <div id={styles.battery}>
                        <div id={styles.battery_content}>
                            <p>80%</p>
                            <img src={battery_icon}/>                   
                        </div>
    
                        <button
                            onClick = {this.runTouch}
                        >
                            Switch
                        </button>
                    </div>
    
                    <div id={styles.status_code}>
                        <p>80</p>
                        <p>NAO Sensor Data</p>
                    </div>            
                </div>
    
            </div>
        )
    }
}

export default sidebar;