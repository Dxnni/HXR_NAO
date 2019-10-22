import React, {Component} from 'react';
import ElectronNAO from '../../../ElectronNAO';
// import logo_icon from '../../assets/icons/logo.png';
import styles from './Action.module.css'

class Action extends Component {

    // standInit = () => {
    //     ElectronNAO.goToPost('StandInit');
    // }

    // crouch = () => {
    //     ElectronNAO.goToPost('Crouch');
    // }

    // lyingBack = () => {
    //     ElectronNAO.goToPost('LyingBack');
    // }

    onClick(event) {
        const value = event.target.value;
        this.props.onSubmit(value);
    }

    render() {
        return (

            <button 
                id={styles.action}
            >
                {/* <img src={logo_icon}/> */}
                <p>YOOO oOO pO B HDH</p>
            </button>
    
        )
    }
}

export default Action;