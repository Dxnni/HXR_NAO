import React, {Component} from 'react';
import ElectronNAO from '../../ElectronNAO';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

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

    walk = () => {
        let secs = 5;
        ElectronNAO.walk(secs);
    }

    render(){
        return (
            <div id={styles.actions} >

                <div id={styles.header}><h1>ACTIONS</h1></div>

                <div id={styles.actions_content} >
                    <div className={styles.quick_actions}>
                            <div>
                                <Action
                                    title="Stand Init"
                                    icon={stand_icon}
                                    onClick={this.standInit}
                                />
                            </div>

                            <div>
                                <Action
                                    title="Crouch"
                                    icon={crouch_icon}
                                    onClick={this.crouch}
                                />
                            </div>
                            
                            <div>
                                <Action
                                    title="Lying Back"
                                    icon={lying_back_icon}
                                    onClick={this.lyingBack}
                                />
                            </div>
                    </div>

                    <div className={styles.move}>
                        <div className={styles.moveUp}
                            onClick = {this.walk}
                        >
                            <FontAwesomeIcon icon={faArrowUp} size="2x"/>
                        </div>
                        <p>Move Forward</p>
                    </div>


                </div>

            </div>
        )
    }
}

export default Actions;