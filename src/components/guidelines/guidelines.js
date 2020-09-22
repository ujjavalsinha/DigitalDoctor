import React from 'react';
import styles from './guidelines.module.css'
import social from '../../images/social.svg'
import handwash from '../../images/hand-wash.svg'
import stayhome from '../../images/stayhome.svg'
import patient from '../../images/patient.svg'
import dosanddonts from '../../images/dosanddonts.jpg'
// import covid from '../../images/covid.svg'
// import social from '../../images/social.svg'
const Guidelines = () => {
    return (
        <div className={styles.MainPage}>
        <div className={styles.Guidelines} id='guidelines'>
            <div className={styles.points}>
                <div className={styles.mask}>
                    <p>COVER YOUR FACE</p>
                    <div >
                        <p>1</p>
                        <img src={patient} alt='patient'/>
                    </div>
                        
                </div>
                <div className={styles.handwash}>
                    <p>WASH HANDS FREQUENTLY</p>
                    <div >
                        <p>2</p>
                        <img src={handwash} alt='patient'/>
                    </div>
                            
                </div>
                <div className={styles.stayhome}>
                    <p>STAY HOME, STAY SAFE</p>
                    <div >
                        <p>3</p>
                        <img src={stayhome} alt='patient'/>
                    </div>
                            
                </div>
                <div className={styles.social}>
                    <p>SOCIAL DISTANCING</p>
                    <div >
                        <p>4</p>
                        <img src={social} alt='patient'/>
                    </div>
                            
                </div>

            </div>
                
        </div>
        <div className={styles.Dosanddonts}>
            <img src={dosanddonts} alt="Dos and donts"/>
        </div>
        </div>
    )
}

export default Guidelines;