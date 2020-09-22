import React from 'react'
import Dictaphone from '../Dictaphone/Dictaphone'
const FormInput = (props) =>{
    return (
        <div>
            <label style={{textTransform : 'capitalize'}}>{props.reading}</label>
            <Dictaphone />
        </div>
        
    )
}

export default FormInput