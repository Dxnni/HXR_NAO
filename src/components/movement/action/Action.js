import React, {Component} from 'react';
import ElectronNAO from '../../../ElectronNAO';
// import logo_icon from '../../assets/icons/logo.png';
import styles from './Action.module.css'

class Action extends Component {

    render() {
        return (

            <div
                id={styles.action}
                onClick={this.props.onClick}
            >
                <div className={styles.icon}>
                    <img src={this.props.icon}/>
                </div>

                <p>{this.props.title}</p>
            </div>
    
        )
    }
}

export default Action;