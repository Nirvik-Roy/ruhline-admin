import React, { useEffect, useState } from 'react'
import './Login.css'
import logo from '../../assets/Frame 1984078480.svg'
import Input from '../../Components/Input.jsx'
import Button from '../../Components/Button.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { Auth, verifyToken } from '../../Store/Slices/Loginslice/AuthSlice.js'
import toast from 'react-hot-toast'
import { useLocation, useNavigate } from 'react-router-dom'
import Loaders from '../../Components/Loaders/Loaders.jsx'
const Login = () => {
    const [emailErrormessage, setEmailerrorMessage] = useState('');
    const [type, setType] = useState(false)
    const location = useLocation()
    const navigate = useNavigate();
    const [adminErrors, setadminErrrors] = useState()
    const { isLogin, isLoading, errors } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const [formData, setformData] = useState({
        email: '',
        password: ''
    })

    useEffect(() => {
        setadminErrrors(errors)
    }, [errors])

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const ValidateEmail = (email) => {
        if (!email) {
            return setEmailerrorMessage('* Email is Required')
        }
        if (!emailRegex.test(email)) {
            return setEmailerrorMessage('* Please Enter a vaild email address')
        }
        return setEmailerrorMessage('');
    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') {
            ValidateEmail(value)
        }
        setformData({
            ...formData,
            [name]: value
        })
    }

    const loginFunc = () => {
        if (formData.email == '' && formData.password == '') {
            toast.error('Plz enter all required fields...')
        }
        else {
            dispatch(Auth({ formData: formData }))
        }
    }

    useEffect(() => {
        dispatch(verifyToken());
    }, [dispatch]);


    useEffect(() => {
        if (
            isLogin &&
            (location.pathname === "/")
        ) {
            navigate("/dashboard", { replace: true });
        }
    }, [isLogin, location.pathname, navigate]);
    return (
        <>
            {isLoading && <Loaders />}
            <div className='login_wrapper'>
                <form className='login_form'>
                    <img src={logo} />
                    <h1>Welcome Back Admin!</h1>
                    <Input name={'email'} onChange={handleChange} type={'email'} label={'Email Address'} required={true} placeholder={'Enter email'} />
                    <small style={{
                        marginLeft: '15px',
                        fontSize: '11px',
                        marginTop: '-15px',
                        color: 'rgba(255, 0, 0, 1)',
                        cursor: 'pointer'
                    }}>{errors.email ? errors?.email[0] : emailErrormessage}</small>
                    <div className='input_form' style={{
                        position: 'relative'
                    }}>
                        <label>Password <span>*</span></label>
                        <input name='password' onChange={handleChange} style={{
                            padding: '0 40px 0 15px '
                        }} type={type ? 'text' : 'password'} placeholder='*********' />
                        <small style={{
                            marginLeft: '15px',
                            fontSize: '11px',
                            marginTop: '-15px',
                            color: 'rgba(255, 0, 0, 1)',
                            cursor: 'pointer'
                        }}>{errors.password && errors.password[0] }</small>
                        {type && <i style={{
                            position: 'absolute',
                            top: '47px',
                            right: '10px',
                            width: '20px',
                            cursor: 'pointer'
                        }} class="fa-regular fa-eye" onClick={(() => setType(!type))}></i>}

                        {!type && <i style={{
                            position: 'absolute',
                            top: '47px',
                            right: '10px',
                            width: '20px',
                            cursor: 'pointer'
                        }} class="fa-regular fa-eye-slash" onClick={(() => setType(!type))}></i>}

                        {/* <img style={{
                            position: 'absolute',
                            top: '50px',
                            right: '40px',
                            width: '15px',
                            cursor: 'pointer'
                        }} src={tick} /> */}
                        <small style={{
                            // marginLeft: '15px',
                            fontSize: '11px',
                            marginLeft: 'auto',
                            color: 'rgba(255, 0, 0, 1)',
                            cursor: 'pointer'
                        }}>Forget Password?</small>
                    </div>
                    <div onClick={(() => loginFunc())}>
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
