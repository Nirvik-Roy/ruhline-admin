import React from 'react'
import './Login.css'
import logo from '../../assets/Frame 1984078480.svg'
import Input from '../../Components/Input.jsx'
import Button from '../../Components/Button.jsx'
import tick from '../../assets/Union.svg'
import eye from '../../assets/Union (1).svg'
import { useNavigate } from 'react-router-dom'
const Login = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className='login_wrapper'>
                <form className='login_form'>
                    <img src={logo} />
                    <h1>Welcome Back Admin!</h1>
                    <Input type={'email'} label={'Email Address'} required={true} placeholder={'example@mail.com'} />
                    <div className='input_form' style={{
                        position: 'relative'
                    }}>
                        <label>Password <span>*</span></label>
                        <input style={{
                            padding: '0 40px 0 15px '
                        }} type='password' placeholder='*********' />
                        <img style={{
                            position: 'absolute',
                            top: '47px',
                            right: '10px',
                            width: '20px',
                            cursor: 'pointer'
                        }} src={eye} />

                        <img style={{
                            position: 'absolute',
                            top: '50px',
                            right: '40px',
                            width: '15px',
                            cursor: 'pointer'
                        }} src={tick} />
                        <small style={{
                            marginLeft: '15px',
                            fontSize: '11px',
                            marginLeft: 'auto',
                            color: 'rgba(255, 0, 0, 1)',
                            cursor: 'pointer'
                        }}>Forget Password?</small>
                    </div>
                    <div onClick={(()=>navigate('/dashboard'))}>
                        <Button children={'Log In'} styles={{
                            width: '100%',
                            padding: '15px 0px'
                        }} />
                    </div>

                </form>
            </div>
        </>
    )
}

export default Login
