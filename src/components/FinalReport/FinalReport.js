import React,{useEffect,useState} from 'react';

import axios from 'axios'
import Report from '../Report/Report'
const FinalReport = (props) => {
    const [userDetails, setUserDetails ] = useState(null)
    const [readings, setReadings] = useState(null)
    const [answers,setAnswers ] = useState(null)
    useEffect(()=>{
        axios.get(`https://digital-doctor.herokuapp.com/api/users/${props.location.user_id}`)
        .then(response => {
            setUserDetails(response.data)
        })
        .catch(error => {
            console.log(error)
        })
        axios.get(`https://digital-doctor.herokuapp.com/api/users/${props.location.user_id}/test/${props.location.reading_id}/`)
        .then(response => {
            setReadings(response.data)
        })
        .catch(error=>{
            console.log(error)
        })
        axios.get(`https://digital-doctor.herokuapp.com/api/users/reading/${props.location.reading_id}/answers`)
        .then(response => {
            setAnswers(response.data)
        })
        .catch(error => {
            console.log(error)
        })
    },[])
    let report = null
    if(!userDetails || !readings || !answers){
        report = (
            <div>
                "Loading..."
            </div>
        )        
    }
    else{
        report = <Report speak_text={props.location.speak_text} reading={readings} user={userDetails} answer={answers} />
    }


    return (
        <div>
             {report}
        </div>
       
    )
}

export default FinalReport
