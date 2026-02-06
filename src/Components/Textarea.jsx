import React from 'react'
import './Input.css'
const Textarea = ({ label, value, placeholder, required,styles,defaultValue,readOnly }) => {
    return (
        <>
            <div className='input_form'>
                <label>{label} {required && <span>*</span>}</label>
                <textarea value={value} readOnly={readOnly} style={styles} defaultValue={defaultValue} placeholder={placeholder}></textarea>
            </div>
        </>
    )
}

export default Textarea
