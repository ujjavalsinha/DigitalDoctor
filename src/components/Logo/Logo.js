import React from 'react'
import styles from './Logo.module.css'

import DrawerToggler from '../DrawerToggler/DrawerToggler'

const Logo = (props) => {
    return (
        <div className={styles.Logo}>
            <div className={styles.Logotext}>
                <p> Digital </p>
                <p>Doctor</p>
            </div>
            
            <div className={styles.Hamburger}>
                <DrawerToggler clicked={props.toggle}/>
            </div>
            
        </div>
        
    )
}

export default Logo;