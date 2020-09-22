import React,{useState} from 'react'
import styles from './Prereport.module.css'
import axios from 'axios'
import Reports from '../Reports/Reports'

const Prereport = (props) => {
    
    const [showReports, setShowReports] = useState(false)
    const [userDetails, setUserDetails] = useState({})
    const [readings,setReadings] = useState([])
    const [answers,setAnswers] = useState(null)
    const showPreviousReports = () => {
        
        axios.get(`https://digital-doctor.herokuapp.com/api/users/${props.location.state.emailid}`)
        .then(response => {
            console.log(response)
            setUserDetails(response.data)
            axios.get(`https://digital-doctor.herokuapp.com/api/users/${props.location.state.emailid}/test/`)
            .then(response=> {
                console.log(response)
                setReadings(response.data)
                setShowReports(true)
                
            })
        })
        .catch(error=>{
            console.log(error)
        })
        axios.get(`https://digital-doctor.herokuapp.com/api/users/${props.location.state.emailid}/answers/`)
        .then(response => {
            console.log(response)
            setAnswers(response.data)
            
        })
        .catch(error=>{
            console.log(error)

        })
        
    }
    const newAssessment = () => {
        props.history.push({pathname : '/readingsform',state : props.location.state})
    }
    
    
    
    return (
        <div className={styles.Prereport}>
            <h4>Welcome back to our website {props.location.state.name}!</h4>
            <div className={styles.Buttons}>
                <button className={styles.Prev} onClick={showPreviousReports}>PREVIOUS REPORTS</button>
                <button className={styles.New} onClick={newAssessment}>
                    NEW ASSESSMENT
                </button>
            </div>
            
            {
                showReports ?
                
                <div>
                   <Reports user={userDetails} readings={readings} answers={answers}/>
                </div>
                : 
                <div className={styles.Instruction}>
                    <ul>
                        <li><p>Click on "PREVIOUS REPORTS" for your previous assessment reports</p></li>
                        <li><p>Click on "NEW ASSESSMENT" to undergo new assessment</p></li>
                    </ul>
                </div>
            }
        </div>
    )
}

export default Prereport

// <Reports user={userDetails} readings={readings} answers={answers}/>