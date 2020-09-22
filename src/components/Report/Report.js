
import React, { useState } from 'react';
import styles from './Report.module.css'
import {useSpeechSynthesis} from 'react-speech-kit'
const Report = (props) => {
    const [generateReport, setGenerateReport] = useState(!props.speak_text)
    
    const speakRisk = ()=>{
        riskclass()
        if(props.speak_text){
            let text = `Covid Risk Factor predicted for user ${props.user.username} is ${props.reading.risk}`
            if(suggestion === "Out of danger"){
                text = text + `You are out of danger`
            }
            else{
                text = text + `We suggest you ${suggestion}`
            }
            speak({text : text})
        }
    }
    
    const {speak} = useSpeechSynthesis()
    
    let suggestion = ''
    const riskclass = () => {
        if(props.reading.risk==="High"){
            suggestion = "Need Supervision and Hospitalised"
            return styles.High
        }
        else if(props.reading.risk === "Very High"){
            suggestion = "Need to be Hospitalized. Need ventilator."
            return styles.VeryHigh
        }
        else if(props.reading.risk === "Medium"){
            suggestion = "Need swab test and home isolation"
            return styles.Medium
        }
        else{
            suggestion = "Out of danger"
            return styles.Low
        }
    }

    const handleGenerate = () => {
        setGenerateReport(true)
        speakRisk()
        
    }

    return (
        <div>
        {generateReport ?
            <div className={styles.Report}>
                <h4>Report Date : {props.reading.created_on.slice(0,10)}</h4>
                <div className={styles.UserRisk}>
                    <div className={styles.Userdetails}>
                        <h4> Personal Information </h4>
                        <p>Name         : {props.user.username}</p>
                        <p>Email        : {props.user.email}</p>
                        <p>Mobile No    : {props.user.mobile}</p>
                        <p>City         : {props.user.city}</p>
                    </div>

                    <div className={styles.Risk}> POTENTIAL RISK : <span className={riskclass()}>{props.reading.risk}</span></div>
                </div>
                <div className={styles.ReadingSymptom}>
                    <div className={styles.Readings}>
                        <h4>Readings</h4>
                        <p>Temperature : {Number(props.reading.temperature).toFixed(1)} °F</p>
                        <p>Cough : {props.reading.cough} days</p>
                        <p>Age : {props.reading.age} years</p>
                        <p>Oximeter : {props.reading.oximeter} %mg</p>
                    </div>
                    <div className={styles.Symptoms}>
                        <h4>Other Details</h4>
                        <p>Travel History : {props.answer.travelhistory.toUpperCase()}</p>
                        <p>Heart Patient : {props.answer.heartpatient.toUpperCase()}</p>
                        <p>Family Member Infected : {props.answer.familyinfected.toUpperCase()}</p>
                        <p>Shortness of breath : {props.answer.shortnessbreath.toUpperCase()}</p>
                    </div>
                </div>
                <div className={styles.Suggestion}><h4>Suggestive Action : {suggestion}</h4></div>
                <div className={styles.Prescriptions}>
                    <h3>PRESCRIPTIONS </h3>
                    {props.reading.risk === "Low" ?
                    <p>***NOT REQUIRED***</p>
                    :
                    <div>
                    <p>FOR ALL </p>
                    <table>
                        <tbody>
                        <tr>
                            <td>TAB Hydrochloroquine 400 MG</td>
                            <td>First day - 02 Tab -Morning/Evening.</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>Next 06 Days - 01 Tab - After Breakfast</td>
                        </tr>
                        <tr>
                            <td>TAB Shelcal (Vitamin -D)</td>
                            <td>For 07 days - 01 - Tab After Lunch</td>
                        </tr>
                        <tr>
                            <td>TAB - Zinc Sulphate </td>
                            <td>For 07 days - 01 - Tab After Dinner</td>
                        </tr>
                        </tbody>
                    </table>
                    <p> IN CASE OF FEVER</p>
                    <table>
                        <tbody>
                        <tr>
                            <td>TAB - DOLO 650</td>
                            <td>05 Days - 03 Tab Morning/Noon/Evening</td>
                        </tr>
                        </tbody>
                    </table>
                    <p>IN CASE OF THROAT PAIN/RUNNING NOSE</p>
                    <table>
                        <tbody>
                        <tr>
                            <td>TAB CETRIZINE - 10 MG</td>
                            <td>05 Days - 02 Tab Morning/Evening</td>
                        </tr>
                        </tbody>
                    </table>
                    <p>IN CASE OF COUGH</p>
                    <table>
                        <tbody>
                        <tr>
                            <td>SYP BRO-ZEDEX</td>
                            <td>05 Days - 03 Spoon</td>
                        </tr>
                        </tbody>
                    </table>
                    <p>IN CASE OF BREATHLESSNESS</p>
                    <table>
                        <tbody>
                        <tr>
                            <td>TAB DEXONA 5 MG</td>
                            <td>05 Days - 01 Tab Evening</td>
                        </tr>
                        </tbody>
                    </table>

                </div>}
                </div>
            </div>:
            <div className={styles.Generate}>
                <p>Your Data has been submitted successfully!</p>
                <button onClick={()=>handleGenerate()}>Generate Report</button>
                
            </div>}
        </div>
    )
}

export default Report