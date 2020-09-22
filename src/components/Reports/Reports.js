import React from 'react'
import styles from './Reports.module.css'
import Report from '../Report/Report'
const Reports = (props) => {
    if(props.readings === null || props.answers === null ){
        return null
    }
    return (
        <div className={styles.Reports}>
            {props.readings.map((reading,index) => <Report key={reading.temperature+index} user={props.user} answer={props.answers[index]} reading={reading}/>)}
        </div>
    )
}

export default Reports