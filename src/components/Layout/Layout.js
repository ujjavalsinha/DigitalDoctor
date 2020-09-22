import React from 'react';
import styles from './Layout.module.css';
import Auxiliary from '../../hoc/Auxiliary';
import Navbar from '../Toolbar/Navbar'
const Layout = (props) => {
    return (
        <Auxiliary>
            
            <div>
                {props.children}
            </div>
        </Auxiliary>

    )
}

export default Layout;