import React from 'react';

import logo_icon from '../../assets/icons/logo.png';
import tts_icon from '../../assets/icons/tts.svg';
import action_icon from '../../assets/icons/action.svg';

import styles from './Sidebar.module.css'

const sidebar = () => {

    return (
        <div id={styles.sidebar}>

            <a href="/">
                <div id={styles.logo}>
                    <img src={logo_icon}/>
                </div>
            </a>

            <div id={styles.buttons}>
                <a href="/tts">
                    <div id={styles.text_input}>
                        <img src={tts_icon}/>
                    </div>
                </a>

                <a href="/actions">
                    <div id={styles.actions}>
                        <img src={action_icon}/>
                    </div>
                </a>
            </div>

        </div>
    )
}

export default sidebar;