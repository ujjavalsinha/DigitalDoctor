import React from 'react';
import styles  from './Navbar.module.css'
import NavbarItem from '../NavbarItem/NavbarItem'
import {Link} from 'react-router-dom'
// import {Link} from 'react-scroll';
const Navbar = (props) => {
    return (
        <div className={styles.nav}>
            <ul>
                <Link to="/"><NavbarItem>Home</NavbarItem></Link>
                <Link to="/guidelines"><NavbarItem>Guidelines</NavbarItem></Link>
                <Link to="/about"><NavbarItem>About</NavbarItem></Link>
                
            </ul>
        </div>
    )
}

export default Navbar;