import React from 'react';
import styles from './About.module.css'
import doctor from '../../images/doctor.PNG';
import monitor from '../../images/monitor.svg'
const About = () => {
    return (
        <div className = {styles.About}>
            <div className={styles.Content}>
                <p className={styles.heading}>I am your digital doctor<span><img src={monitor} alt="Monitor"/></span></p>
                <p className={styles.message}>A completely contactless application to save your time/money/health, and we assist
                    you with a Smart Automated Virtual solution having following features
                </p>
                <ul>
                    <li>Conduct @home primary consultation virtually with the patients over audio to collect the symptoms</li>
                    <li>Perform predictive analysis based on the symptoms</li>
                    <li>Predict COVID-19 risk factor</li>
                    <li>Suggest basic medical prescription & next measures and advice to visit hospital only when essential</li>
                    <li>Re-assessment for registered patient on need basis</li>                
                </ul>
            </div>
            <div className={styles.Image}>
                <img src={doctor} alt="doctor"/>
            </div>
        </div>
    )
}

export default About;