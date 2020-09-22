import React,{useState,useEffect} from 'react';
import Dictaphone from '../Dictaphone/Dictaphone';
import styles from './VoiceForm.module.css'
import send from '../../images/send.svg'
import axios from 'axios';
import {Link} from 'react-router-dom'
import {useSpeechSynthesis} from 'react-speech-kit'
const VoiceForm = (props) =>{

    const {speak} = useSpeechSynthesis()
    const [finalAnswers,setFinalAnswers] = useState(null)
    const [index,setIndex] = useState(0)
    const [start,setStart] = useState(true)
    const [answer, setAnswer] = useState('')
    const [answers,setAnswers] = useState(['','','',''])
    const [QuestionsAnswers, setQuestionAnswers] = useState({"Do you have travel history?":'',"Are you a heart patient?":'',"Anyone in your family infected?":'',"Do you have shortness of breath?":''})
    // let Questions = {"Dou you have travel history?":'',"Are you a heart patient?":'',"Is/was anyone in your family infected?":''}
    useEffect(()=>{
        setIndex(prevIndex=>prevIndex+1)
        let speak_questions = Object.keys(QuestionsAnswers)
        speak({text : speak_questions[index]})
    },[answers])
    
    useEffect(()=>{
        if(finalAnswers !== null){
            // console.log("INSIDE AXIOS CALL")
            axios.post(`https://digital-doctor.herokuapp.com/api/users/reading/${props.location.reading_id}/answers`,finalAnswers)
            .then(response => {
                console.log(response)
                
            })
            .catch(error => {
                console.log(error)
            })
        }
        else{
            console.log("Dont call answer post")
        }
    },[finalAnswers])

    const answerHandler = (transcript) => {
         if(transcript === ''){
             return
         }
         setAnswer(transcript)
    }
    
    const postAnswers = () =>{
        // console.log("INSIDE POST ANSWERS")
        let answers = []
        Object.values(QuestionsAnswers).map((answer,index) => {
            if((new RegExp('yes')).test(answer) || new RegExp('yeah').test(answer) 
             || new RegExp('yea').test(answer) || new RegExp('ya').test(answer)){
                answers.push('yes')
            }
            else if((new RegExp('no')).test(answer)){
                answers.push('no')
            }
            return
        })
        setFinalAnswers(answers)
        
    }

    const handleQuestionAnswer = () =>{
        
        if(answer ===''){
            return
        }
        else if(answer == 'yes' || answer == 'no')
        {
            const newanswers = [...answers]
            newanswers[index]=answer
            setAnswers(newanswers)
            const Questions = {...QuestionsAnswers}
            Questions[Object.keys(Questions)[index-1]] = answer
            setQuestionAnswers(Questions)
            // console.log(index)
            setAnswer('')
        }
        else{
            speak({text : 'You can answer only in Yes or No'})
            return
        }
        
        
    }
    
    const startHandler = () =>{
        setStart(false)
        let speak_questions = Object.keys(QuestionsAnswers)
        speak({text : 'Click on the microphone icon and speak for each question'})
        speak({text : 'Click on send icon to submit your recorded answer'})
        speak({text : speak_questions[0]})
        
    }
    let new_questions = Object.keys(QuestionsAnswers).slice(0,index)
    // console.log("FINAL ANSWERS :",finalAnswers)
    // console.log("PROPs",props)
    return(
        <div>
        <h2>Audio Consultation</h2>
        
        {start ? 
         <div className={styles.Start}>
             <div className={styles.Message}>
             <ul>
             <li><p>Listen/Read the questions carefully.</p></li>
             <li><p>Click on the microphone icon and speak for each question</p></li>
             <li><p>Click on send icon to submit your recorded answer</p></li>
             </ul>
             
             </div>
             <button onClick={startHandler}>START</button>
             
         </div>
         :
        <div className={styles.VoiceForm}>
            <p className={styles.answerinstruction}>You can answer only in Yes/No</p>
            <div className={styles.Questions}>
                {new_questions.map(question => {
                    return (<div key={question}>
                                <p className={styles.Question}>{question}</p>
                                {
                                QuestionsAnswers[question] !==''?
                                <p className={styles.Answer}>{QuestionsAnswers[question]}</p>
                                :
                                null
                                }   
                            </div>)})}
                    
            </div>
            { index<=4 ?
            <div className={styles.Listener}>
                <p>{answer}</p>
                <Dictaphone transcriptHanlder={answerHandler}/>
                <img src={send} onClick={handleQuestionAnswer} alt="send"/>
            </div>
            
            
            :
            finalAnswers ?
            <Link to={{
                pathname :"/finalreport/" ,
                user_id:props.location.user_id, 
                reading_id:props.location.reading_id,
                speak_text:true}}><button className={styles.Report}>Proceed</button></Link>
            :
            <button onClick={(e)=>{postAnswers(e)}} className={styles.Continue}>Evaluate Risk</button>}
            
        </div>}
        </div>
    )
}

export default VoiceForm;
