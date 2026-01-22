import React, { useState } from 'react'
import './Modal.css'
import tick from '../../assets/Union.svg'
import eye from '../../assets/Union (1).svg'
import Button from '../../Components/Button'
import toast from 'react-hot-toast'
import Loaders from '../../Components/Loaders/Loaders'
import { Changeuserpassword } from '../../utils/user'
import { useDispatch } from 'react-redux'
import { AuthlogOut } from '../../Store/Slices/Loginslice/AuthSlice'
const ChangePasswordModal = ({ modalFunction }) => {
    const [isLoading, setisLoading] = useState(false);
    const dispatch = useDispatch()
    const [passwordMsg, setPasswordMsg] = useState("");
    const [confirmPasswordMsg, setConfirmPasswordMsg] = useState();
    const [type, setType] = useState()
    const [type2, setType2] = useState()
    const [type3, setType3] = useState()
    const [userPasswordErrors, setuserPasswordErrors] = useState([])
    const [formData, setformData] = useState({
        current_password: '',
        password: '',
        password_confirmation: '',
    })


    const validatePasswordMsg = (password) => {
        if (!password) return "";
        if (password.length < 8) {
            return "Password must be at least 8 characters";
        }
        return "";
    };

    const validateConfirmPasswordMsg = (password, confirmPassword) => {
        if (!confirmPassword) return "";
        if (password !== confirmPassword) {
            return "Password and Confirm Password should be same";
        }
        return "";
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "password") {
            setPasswordMsg(validatePasswordMsg(value));
            setConfirmPasswordMsg(
                validateConfirmPasswordMsg(value, formData.password_confirmation)
            );
        }

        if (name === "password_confirmation") {
            setConfirmPasswordMsg(
                validateConfirmPasswordMsg(formData.password, value)
            );
        }
        setformData({
            ...formData,
            [name]: value
        })
    }

    const handleChangePassword = async () => {
        const { current_password, password, password_confirmation } = formData;
        if (current_password != '' && password != '' && password_confirmation != '') {
            setisLoading(true)
            try {
                const result = await Changeuserpassword(formData);
                setuserPasswordErrors(result);
                console.log(result)
                if(result.message == "Your password has been changed successfully."){
                     dispatch(AuthlogOut()) 
                }
              
            } catch (err) {
                toast.error(err.response?.data?.message);
            } finally {
                setisLoading(false)
            }
        } else {
            toast.error('Plz enter all the fields..')
        }
    }

    return (
        <>
            {isLoading && <Loaders />}
            <div className='modal_wrapper' onClick={(() => modalFunction(0))}></div>
            <div className='modal_div'>
                <h4>Change Password</h4>
                <i class="fa-solid fa-xmark" onClick={(() => modalFunction(0))}></i>
                <form className='modal_form'>
                    <div className='input_form' style={{
                        position: 'relative'
                    }}>
                        <label>Current Password <span>*</span></label>
                        <input name='current_password' onChange={handleChange} style={{
                            padding: '0 40px 0 15px '
                        }} value={formData.current_password} type={type ? 'text' : 'password'} placeholder='*********' />
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

                    </div>
                    <small style={{
                        fontSize: '0.7rem',
                        display: 'block',
                        marginTop: '-10px',
                        color: 'red'
                    }}>{userPasswordErrors?.current_password && userPasswordErrors.current_password}</small>
                    <div className='input_form' style={{
                        position: 'relative'
                    }}>
                        <label>New Password <span>*</span></label>
                        <input name='password' onChange={handleChange} style={{
                            padding: '0 40px 0 15px '
                        }} value={formData.password} type={type2 ? 'text' : 'password'} placeholder='*********' />
                        {type2 && <i style={{
                            position: 'absolute',
                            top: '47px',
                            right: '10px',
                            width: '20px',
                            cursor: 'pointer'
                        }} class="fa-regular fa-eye" onClick={(() => setType2(!type2))}></i>}

                        {!type2 && <i style={{
                            position: 'absolute',
                            top: '47px',
                            right: '10px',
                            width: '20px',
                            cursor: 'pointer'
                        }} class="fa-regular fa-eye-slash" onClick={(() => setType2(!type2))}></i>}
                        <small style={{
                            fontSize: '0.7rem',
                            display: 'block',
                            marginTop: '5px',
                            color: 'red'
                        }}>{userPasswordErrors?.password ? userPasswordErrors?.password[0] : passwordMsg}</small>
                    </div>

                    <div className='input_form' style={{
                        position: 'relative'
                    }}>
                        <label>Confirm Password <span>*</span></label>
                        <input value={formData.password_confirmation} name='password_confirmation' onChange={handleChange} style={{
                            padding: '0 40px 0 15px '
                        }} type={type3 ? 'text' : 'password'} placeholder='*********' />
                        {type3 && <i style={{
                            position: 'absolute',
                            top: '47px',
                            right: '10px',
                            width: '20px',
                            cursor: 'pointer'
                        }} class="fa-regular fa-eye" onClick={(() => setType3(!type3))}></i>}

                        {!type3 && <i style={{
                            position: 'absolute',
                            top: '47px',
                            right: '10px',
                            width: '20px',
                            cursor: 'pointer'
                        }} class="fa-regular fa-eye-slash" onClick={(() => setType3(!type3))}></i>}
                        {confirmPasswordMsg == '' && <img style={{
                            position: 'absolute',
                            top: '50px',
                            right: '40px',
                            width: '15px',
                            cursor: 'pointer'
                        }} src={tick} />}
                        <small style={{
                            fontSize: '0.7rem',
                            display: 'block',
                            marginTop: '5px',
                            color: 'red'
                        }}>{userPasswordErrors?.password ? userPasswordErrors?.password[1] : confirmPasswordMsg}</small>
                    </div>

                    <div className='change_cancel_wrapper'>
                        <button onClick={(() => modalFunction(0))}>Cancel</button>
                        <div onClick={(() => handleChangePassword())}>
                            <Button children={'Change'} />
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default ChangePasswordModal
