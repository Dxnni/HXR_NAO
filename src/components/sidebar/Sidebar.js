import React from 'react';
import { Link } from 'react-router-dom';

import logo_icon from '../../assets/icons/logo.png';
import tts_icon from '../../assets/icons/tts.svg';
import action_icon from '../../assets/icons/action.svg';

import styles from './Sidebar.module.css'

const sidebar = () => {

    return (
        <div id={styles.sidebar}>

            <Link to = "/">
                <div id={styles.logo}>
                    <img src={logo_icon}/>
                </div>
            </Link>

            <div id={styles.buttons}>
                <Link to = "/tts">
                    <div id={styles.text_input}>
                        <img src={tts_icon}/>
                    </div>
                </Link>

                <Link to = "/actions">
                    <div id={styles.actions}>
                        <img src={action_icon}/>
                    </div>
                </Link>
            </div>

        </div>
    )
}

export default sidebar;