import React, { useEffect, useState } from 'react'
import Button from '../../Components/Button'
import Input from '../../Components/Input'
import tick from '../../assets/Union.svg'
import upload from '../../assets/Vector (8).svg'
import { getAllPhoneCountry } from '../../utils/location'
import Loaders from '../../Components/Loaders/Loaders'
import { addCustomer } from '../../utils/cutomer'
import toast from 'react-hot-toast'
const AddCustomerModal = ({ setaddCustomer, fetchCustomer }) => {
    const [passwordMsg, setPasswordMsg] = useState("");
    const [isLoading, setisLoading] = useState(false);
    const [errors, setErrrors] = useState([]);
    const [phoneData, setPhoneData] = useState([]);
    const [type2, setType2] = useState()
    const [type3, setType3] = useState();
    const [file, setFile] = useState('')
    const [confirmPasswordMsg, setConfirmPasswordMsg] = useState();
    const [formData, setformData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        phone_country_code_id: '',
        password: '',
        password_confirmation: ''
    })

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    useEffect(() => {
        const fetchPhone = async () => {
            setisLoading(true)
            try {
                const result = await getAllPhoneCountry();
                setPhoneData(result)
            } catch (err) {
                console.log(err)
            } finally {
                setisLoading(false)
            }
        }
        fetchPhone()
    }, [])

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

    const handleSubmit = async () => {
        setisLoading(true)
        try {
            if (formData.first_name != '' && formData.last_name != '' && formData.email != '' && formData.password != '' && formData.password_confirmation != '' && formData.phone_country_code_id != '' && formData.phone != '') {
                const formdataNew = new FormData();
                formdataNew.append("first_name", formData.first_name);
                formdataNew.append("last_name", formData.last_name);
                formdataNew.append("email", formData.email);
                formdataNew.append("phone", formData.phone);
                formdataNew.append("phone_country_code_id", formData.phone_country_code_id);
                formdataNew.append("password", formData.password);
                formdataNew.append("password_confirmation", formData.password_confirmation);
                { file && formdataNew.append('profile_image', file) }
                const result = await addCustomer(formdataNew)
                setErrrors(result)
                if (result?.success) {
                    fetchCustomer()
                    setaddCustomer(false)
                }
            } else {
                toast.error('Plz enter all the fields...')
            }
        } catch (err) {
            console.log(err)
        } finally {
            setisLoading(false)
        }
    }
    return (
        <>
            {isLoading && <Loaders />}
            <div className='modal_wrapper' onClick={(() => setaddCustomer(false))}></div>
            <div className='modal_div'>
                <h4>Add Customer</h4>
                <i class="fa-solid fa-xmark" onClick={(() => setaddCustomer(false))}></i>
                <form className='modal_form'>
                    <div className='modal_input_grid_wrapper'>
                        <div>
                            <Input name={'first_name'} value={formData.first_name} onChange={handleChange} label={'First Name'} required={true} placeholder={'Enter first name'} />
                            <small style={{
                                fontSize: '0.7rem',
                                display: 'block',
                                marginTop: '5px',
                                color: 'red'
                            }}>{errors?.first_name && errors?.first_name[0]}</small>
                        </div>
                        <div>
                            <Input name={'last_name'} onChange={handleChange} value={formData.last_name} label={'Last Name'} required={true} placeholder={'Enter last name'} />
                            <small style={{
                                fontSize: '0.7rem',
                                display: 'block',
                                marginTop: '5px',
                                color: 'red'
                            }}>{errors?.last_name && errors?.last_name[0]}</small>
                        </div>
                        <div>

                            <Input name={'email'} value={formData.email} onChange={handleChange} label={'Email'} required={true} placeholder={'Enter email address'} />
                            <small style={{
                                fontSize: '0.7rem',
                                display: 'block',
                                marginTop: '5px',
                                color: 'red'
                            }}>{errors?.email && errors?.email[0]}</small>
                        </div>

                        <div className='input_form' style={{
                            position: 'relative'
                        }}>
                            <label> Password <span>*</span></label>
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
                            }}>{errors?.password ? errors?.password[0] : passwordMsg}</small>
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
                            }}>{errors?.password ? errors?.password[1] : confirmPasswordMsg}</small>
                        </div>
                        <div className='input_form confirm_input_form'>
                            <label>Phone no<span>*</span></label>
                            <div className='phone_input_Wrapper656'>
                                <select name='phone_country_code_id' onChange={handleChange} value={formData.phone_country_code_id} style={{
                                    border: 'none',
                                    borderRight: '2px solid #000',
                                    outline: 'none'
                                }}>
                                    {phoneData?.map((e,) => (
                                        <option key={e.id} value={e.id}>+{e.phone_code}</option>
                                    ))}
                                </select>
                                <input onChange={handleChange} name='phone' value={formData.phone} placeholder='Enter phone number' />
                            </div>

                            <small style={{
                                fontSize: '0.7rem',
                                display: 'block',
                                marginTop: '5px',
                                color: 'red'
                            }}>{errors?.phone && errors?.phone[0]}</small>
                        </div>

                    </div>
                    <div className='input_form'>
                        <label style={{
                            fontSize: '15px',
                            fontWeight: '600'
                        }}>Upload Image<span>*</span></label>

                        <div className='files_upload_wrapper'>
                            {!file && <>
                                <img src={upload} />
                                <p>Drag your files or <span>Browse</span></p>
                                <h5>Png, Jpg, Jpeg supported | file size: 250 KB</h5>
                            </>}
                            {file && <img style={{
                                width: '100%',
                                height: '95%',
                                objectFit: 'contain'
                            }} src={URL.createObjectURL(file)} />}
                            <input onChange={handleFileChange} type='file' />
                        </div>
                        <small style={{
                            fontSize: '0.7rem',
                            display: 'block',
                            marginTop: '5px',
                            color: 'red'
                        }}>{errors?.profile_image && errors?.profile_image[0]}</small>
                    </div>
                    <div onClick={handleSubmit} className='change_cancel_wrapper'>
                        <Button children={'Add'} />
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddCustomerModal
