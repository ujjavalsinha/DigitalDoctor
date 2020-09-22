import React from 'react';
import styles from './Home.module.css';
import image from '../../images/medical.svg'
// import image from '../../images/consulting.svg'
import {Link} from 'react-router-dom'

const Home = () => {
    return (
        <div className={styles.Home} id='home'>
            <div className={styles.Presentation}>
                <div className={styles.Paragraph}>
                    <h1 className={styles.heading}>
                        Are You Worried about risk of COVID-19?
                    </h1>
                    <p className={styles.message}>
                        Save your precious time by avoiding long queues at hospitals and diagnostics centers for consultation and swab test
                    </p>
                    <p className={styles.message}>
                        Save your precious health by avoiding direct physical contacts to and fro Hospital visits.
                    </p>
                    <p className={styles.message}>
                        Let me help you find out through our COVID-19 risk assessment check developed using WHO and CDC guidelines.
                    </p>
                    
                </div>
                    
                
                <div className={styles.Image}>
                    <img src={image} alt='paceholder'/>
                </div>
                
            </div>
            
            <Link to="/userform"><button className={styles.HomeContinue}>Continue</button></Link>
        </div>
    )
}

export default Home;