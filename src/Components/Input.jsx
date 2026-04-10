import React from 'react'
import './Input.css'
const Input = ({readOnly, label, type, placeholder, name, required, value, defaultValue,onChange,fieldReuqired,style }) => {
    return (
        <>
            <div className='input_form' style={style}>
                <label>{label} {required && <span>*</span>}</label>
                <input readOnly={readOnly} required={fieldReuqired} type={type} name={name} value={value} onChange={onChange} defaultValue={defaultValue} placeholder={placeholder} />
            </div>
        </>
    )
}

export default Input

