import React from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

// Media
import logo_icon from '../../assets/icons/logo.png';
import tts_icon from '../../assets/icons/tts.svg';
import action_icon from '../../assets/icons/action.svg';

// Styles
import styles from './Sidebar.module.css'

// Components
import NavItems from './navitems/NavItems'

const sidebar = () => {

    return (
        <div id={styles.sidebar}>
            
            <div id={styles.logo}>
                <Link to = "/">
                    <img src={logo_icon}/>
                </Link>
            </div>

            <ul className={styles.navItems}>
                <li className={styles.navItem}>
                    <NavLink 
                        to="/tts"
                        activeClassName="active"
                    >
                        <div className={styles.content}>
                            <img src={tts_icon}/>
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
                            <img src={action_icon}/>
                            <p>ACT</p>
                        </div>
                    </NavLink>
                </li>
            </ul>

        </div>
    )
}

export default sidebar;