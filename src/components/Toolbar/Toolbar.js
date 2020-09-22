import React, {useState} from 'react';
import styles from './Toolbar.module.css';
import Logo from '../Logo/Logo'
import Navbar from '../Navbar/Navbar'
import Sidedrawer from '../Sidedrawer/Sidedrawer'
import Auxiliary from '../../hoc/Auxiliary'
const Toolbar = (props) => {
    const [showSidedrawer, setShowsidedrawer] = useState(false)
    const closeSidedrawerHandler = () => {
        setShowsidedrawer(false)
    }

    const toggleSidedrawer = () =>{
        setShowsidedrawer(prevshowSidedrawer => !prevshowSidedrawer)
    }
    return (
        <Auxiliary>
            <Sidedrawer clicked={closeSidedrawerHandler} show={showSidedrawer} toggle={toggleSidedrawer}/>
            <div className={styles.Toolbar}>
                <div className={styles.Logo}>
                    <Logo toggle={toggleSidedrawer}/> 
                </div>
                <div className={styles.Nav}>
                    <Navbar />
                </div>
                
            </div>
        </Auxiliary>
        
        
    )
}

export default Toolbar;