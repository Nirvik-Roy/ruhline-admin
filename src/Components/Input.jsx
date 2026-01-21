import React from 'react'
import './Input.css'
const Input = ({ label, type, placeholder, name, required, value, defaultValue,onChange,fieldReuqired }) => {
    return (
        <>
            <div className='input_form'>
                <label>{label} {required && <span>*</span>}</label>
                <input required={fieldReuqired} type={type} name={name} value={value} onChange={onChange} defaultValue={defaultValue} placeholder={placeholder} />
            </div>
        </>
    )
}

export default Input

