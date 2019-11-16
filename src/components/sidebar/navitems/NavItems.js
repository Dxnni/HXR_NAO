import React from 'react';

import { NavLink } from 'react-router-dom';

// Components
import NavItem from './navitem/NavItem'

// Media
import tts_icon from '../../../assets/icons/tts.svg';
import action_icon from '../../../assets/icons/action.svg';

// Stylesheet
import styles from './NavItems.module.css';

const navitems = () => (
    <ul className={styles.navItems}>

        <li className={styles.navItem}>
            <NavLink 
                to="/tts"
                activeClassName="active"
            >
                <div className={styles.content}>
                    <div id={styles.logo}>
                        <img src={tts_icon}/>
                    </div>
                    <p>TTS</p>
                </div>

            </NavLink>
        </li>

        <li className={styles.navItem}>
            <NavLink 
                to="/actions"
                activeClassName="active"
            >
                <div className={styles.content}>
                    <div id={styles.logo}>
                        <img src={action_icon}/>
                    </div>
                    <p>ACT</p>
                </div>
            </NavLink>
        </li>

    </ul>
);

export default navitems;