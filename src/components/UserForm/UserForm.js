import React,{Component} from 'react';
import styles from './UserForm.module.css';
import fillform from '../../images/fillforms.svg'
import axios from 'axios';
// import {Link,Route} from 'react-router-dom';
// import ReadingsForm from '../ReadingsForm/ReadingsForm'
const phoneno = /^\d{10}$/;

const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
class UserForm extends Component{
    state = {
        name : '',
        city : '',
        emailid :'',
        mobile : '',
        errors : {
            name : '',
            city : '',
            emailid : '',
            mobile : ''
        },
        final_errors : {
            name : '',
            city : '',
            emailid : '',
            mobile : ''
        },
        present : false
    }
    validateForm = (errors) => {
        let valid = true;
        Object.values(errors).forEach(
          // if we have an error string set valid to false
          (val) => val.length > 0 && (valid = false)
        );
        return valid;
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.setState({final_errors : this.state.errors})
        event.preventDefault();
        if(this.validateForm(this.state.errors)){
            console.info('Valid Form')
            axios.get(`https://digital-doctor.herokuapp.com/api/users/${this.state.emailid}`)
            .then(response => {
                console.log(response)
                this.setState({present : true})
                this.props.history.push({pathname:'/prereport',state:this.state})
            })
            .catch(error => {
                console.log(error)
                this.userPostHandler()

        })
            // this.userPostHandler()
        }
        
        else{
            console.info('invalid')
            return
        }
    }
    userPostHandler = () => {
        

        const users = {
            
            username : this.state.name,
            email : this.state.emailid,
            mobile : this.state.mobile,
            city : this.state.city
        }
        // console.log("USERS : ",users)
        axios({
            method: 'post',
            url: 'https://digital-doctor.herokuapp.com/api/users',
            data: users,
            headers : {
                'Content-Type': 'multipart/form-data; boundary=--------------------------480631856397574048967427', 'Accept': '*/*'
            }
          })
        .then(response => {
            console.log(response)
            this.props.history.push({pathname:'/readingsform',state:this.state})
        })
        .catch(error=> {
            console.log(error)
        })
        
    }
    checkIfUserPresent = () => {
        axios.get(`https://digital-doctor.herokuapp.com/api/users/${this.state.emailid}`)
        .then(response => {
            console.log(response)
            this.setState({present : true})
            this.props.history.push({pathname:'/prereport',state:this.state})
        })
        .catch(error => {
            console.log(error)
            this.userPostHandler()

        })
    }
    checkActive = () => {
        if(this.state.username === '' || this.state.emailid ==='' 
        || this.state.city === '' || this.state.mobile === ''){
            return false
        }
        else{
            return true
        }
    }
    handleChange = (event) => {
        event.preventDefault();
        const {id,value} = event.target
        let errors = this.state.errors;
        switch (id){
            case 'name' :
                errors.name = 
                    value.length < 5 
                    ? "Full Name must be 5 characters long!"
                    : '';
            break;
            case 'emailid':
                errors.emailid = 
                validEmailRegex.test(value) 
                ? ''
                : "Email is not valid!";
            break;
            case 'mobile':
                errors.mobile = 
                value.match(phoneno)
                ?
                ''
                :
                'Invalid Mobile Number'

        }
        this.setState({errors,[id]: value})
    }

    render()
    {
        // console.log(this.state.present)
        return (
                
                    <div className={styles.MainPage}>
                        <div className={styles.Fillform}>
                            <img src={fillform} alt="fillform"/>
                        </div>
                        
                        
                        <div className={styles.UserForm}>
                            <form>
                                <h1>User Registration</h1>
                                <label className={styles.required}>Name</label>
                                <input  type="text" id="name" value={this.state.name} onChange={(e)=>this.handleChange(e)} required/>
                                {this.state.final_errors.name.length > 0 ? <p className={styles.errors}>{this.state.final_errors.name}</p> : null}
                                <label className={styles.required}>Email Id</label>
                                <input type="text" id="emailid" value={this.state.emailid} onChange={(e)=>this.handleChange(e)}/>
                                {this.state.final_errors.emailid.length > 0 ? <p className={styles.errors}>{this.state.final_errors.emailid}</p> : null}
                                <label className={styles.required}>Mobile No</label>
                                <input type="text" id="mobile" value={this.state.mobile} onChange={(e)=>this.handleChange(e)}/>
                                {this.state.final_errors.mobile.length > 0 ? <p className={styles.errors}>{this.state.final_errors.mobile}</p> : null}
                                <label className={styles.required}>City</label>
                                <input type="text" id="city" value={this.state.city} onChange={(e)=>this.handleChange(e)}/>
                                <button disabled={!this.checkActive()} onClick={(e)=>{this.handleSubmit(e)}} className={styles.UserFormContinue}> Continue </button>
                            </form>
                        
                        </div>
                </div>

        )
    }
}

export default UserForm;