import React from 'react';
import { NavLink } from 'react-router-dom';
// Styles
import styles from './NavItem.module.css'

const navitem = (props) => (

    <li className={styles.navItem}>
        <NavLink 
            to={props.link}
            activeClassName="active"
        >
            <div className={styles.content}>
                <div id={styles.logo}>
                    <img src={props.icon}/>
                </div>
                <p>{props.name}</p>
            </div>
        </NavLink>
    </li>

);

export default navitem;