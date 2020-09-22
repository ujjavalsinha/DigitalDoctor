
import React,{Component} from 'react';
import styles from './ReadingsForm.module.css'
import axios from 'axios'
// import VoiceForm from '../VoiceForm/VoiceForm'
const numeric = /^\d+$/;
class ReadingsForm extends Component{
    state = {
        temperature : '',
        age : '',
        cough :'',
        oximeter : '',
        errors : {
            temperature : '',
            age : '',
            cough : '',
            oximeter : ''
        },
        final_errors : {
            temperature : '',
            age : '',
            cough : '',
            oximeter : ''
        }
    
    }
    checkActive = () => {
        if(this.state.temperature === '' || this.state.cough === '' || this.state.age === '' || this.state.oximeter ===''){
            return false
        }
        else{
            return true
        }
    }
   userPostHandler = () =>{
       const readings = {
           'oximeter' : this.state.oximeter,
           'temperature' : this.state.temperature,
           'age' : this.state.age,
           'cough' : this.state.cough
       }
    //    console.log("READINGS",readings)
       axios.post(`https://digital-doctor.herokuapp.com/api/users/${this.props.location.state.emailid}/test/`,readings)
       .then(response => {
           console.log(response)
           this.props.history.push({pathname:'/voiceform',reading_id : response.data,user_id : this.props.location.state.emailid})
       })
       .catch(error => {
           console.log(error)
       })
       
   }

   handleSubmit = (e) => {
       this.setState({final_errors : this.state.errors})
       e.preventDefault()
       if(this.validateForm(this.state.errors)){
            console.log("Valid Form")
            this.userPostHandler()
       }else{
           return
       }
   }

   validateForm = (errors) => {
        let valid = true;
        Object.values(errors).forEach(
        // if we have an error string set valid to false
        (val) => val.length > 0 && (valid = false)
        );
        return valid;

   }

   handleChange = (event) => {
    event.preventDefault();
    const {id,value} = event.target
    let errors = this.state.errors;
    switch (id){
        case 'temperature' :
            errors.temperature = 
                value.match(numeric)
                ? 
                    eval(value)<90 || eval(value)>120 ? "Invalid Temperature" : ''

                : 'Invalid Temperature';
        break;
        case 'oximeter':
            errors.oximeter = 
            value.match(numeric)
            ? eval(value) < 70 || eval(value) > 98 ? "Please enter Valid Oximeter Reading" : ''
            : "Invalid Oximeter Reading"
            
        break;
        case 'age' :
            errors.age =
            value.match(numeric)
            ? ''
            : "Invalid Age. Please enter age in numbers"
        break;
        case 'cough':
            errors.cough = 
            value.match(numeric)
            ? ''
            : "Enter age in number of days"
        break;

        }
        this.setState({errors,[id]: value})
    }
    render(){
    
    return (
        <div className={styles.ReadingsForm}>
            <h1>Hi {this.props.location.state.name}!</h1>
            <p> Please provide your readings here.
            </p>
            <form>
                <label className={styles.required}>Temperature(97-105 °F)</label>
                <input type="text" id="temperature" value={this.state.temperature} onChange={(e)=>this.handleChange(e)}/>
                {this.state.final_errors.temperature.length > 0 ? <p className={styles.errors}>{this.state.final_errors.temperature}</p> : null}
                <label className={styles.required}>Age(Years)</label>
                <input type="text" id="age" value={this.state.age} onChange={(e)=>this.handleChange(e)}/>
                {this.state.final_errors.age.length > 0 ? <p className={styles.errors}>{this.state.final_errors.age}</p> : null}
                <label className={styles.required}>Cough(Days)</label>
                <input type="text" id="cough" value={this.state.cough} onChange={(e)=>this.handleChange(e)}/>
                {this.state.final_errors.cough.length > 0 ? <p className={styles.errors}>{this.state.final_errors.cough}</p> : null}
                <label className={styles.required}>Oximeter Reading(70-98 %mg)</label>
                <input type="text" id="oximeter" value={this.state.oximeter} onChange={(e)=>this.handleChange(e)}/>
                {this.state.final_errors.oximeter.length > 0 ? <p className={styles.errors}>{this.state.final_errors.oximeter}</p> : null}
                <button disabled={!this.checkActive()} onClick={(e)=>{this.handleSubmit(e)}} className={styles.ReadingContinue}> Continue </button>
            {/* <Link to="/voiceform"><button className={styles.Continue}> Continue </button></Link> */}
            </form>
            {/* <VoiceForm/> */}
        </div>
    )
    }
}

export default ReadingsForm