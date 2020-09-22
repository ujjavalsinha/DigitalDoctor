import React from 'react';
import styles from './Sidedrawer.module.css';
// import NavbarItem from '../NavbarItem/NavbarItem'
import Logo from '../Logo/Logo'
import Backdrop from '../Backdrop/Backdrop'
import Auxiliary from '../../hoc/Auxiliary'
import {NavLink} from 'react-router-dom'
const Sidedrawer = (props) => {
    let classes = props.show ? [styles.Sidedrawer,styles.Open] : [styles.Sidedrawer,styles.Close]
    return (
        <Auxiliary>
            <div className={styles.Backdrop}>
                <Backdrop show={props.show} clicked={props.clicked}/>
            </div>
            
            <div className={classes.join(' ')}>
            
                <div className={styles.Logo}>
                    <Logo toggle={props.toggle}/>
                </div>
                <div className={styles.navbar}>
                    <ul>
                        <li><NavLink to="/" exact>Home</NavLink></li>
                        <li><NavLink to='/about'>About</NavLink></li>
                        <li><NavLink to='/guidelines'>Guidlines</NavLink></li>
                    </ul>
                </div>
            </div>
        
        </Auxiliary>
        
    )
}

export default Sidedrawer;