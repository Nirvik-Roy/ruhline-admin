import React, { useEffect, useState } from 'react'
import Button from '../../Components/Button'
import Input from '../../Components/Input'
import upload from '../../assets/Vector (8).svg'
import eye from '../../assets/Union (1).svg'
import { getAllPhoneCountry } from '../../utils/location'
import toast from 'react-hot-toast'
import Loaders from '../../Components/Loaders/Loaders'
const EditCoachModal = ({ seteditCoachModal, singleCoachdata, singleCoachLoading, editNewCoachfunc, updateErrors }) => {
    const [emailerrorMessage, setEmailerrorMessage] = useState('');
    const [phoneCodes, setphoneCodes] = useState([]);
    const [contacterrorMessage, setContactErrorMessage] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [passwordMsg, setPasswordMsg] = useState("");
    const [confirmPasswordMsg, setConfirmPasswordMsg] = useState("");
    const [file, setFile] = useState()
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const contactRegex = /^[0-9]{10}$/;
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const [formData, setformData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        phone_country_code_id: '',
        gender: '',
        coach_type: '',
        password: '',
        password_confirmation: '',
    })

    useEffect(() => {
        setformData({
            first_name: singleCoachdata?.user?.first_name,
            last_name: singleCoachdata?.user?.last_name,
            email: singleCoachdata?.user?.email,
            phone: singleCoachdata?.profile?.phone,
            phone_country_code_id: singleCoachdata?.profile?.phone_country_code?.id,
            gender: singleCoachdata?.profile?.gender,
            coach_type: singleCoachdata?.profile?.coach_type,
            password: '',
            password_confirmation: '',
        })
    }, [singleCoachdata, singleCoachLoading, phoneCodes])

    const getAllPhoneCountryCode = async () => {
        setIsLoading(true)
        try {
            const res = await getAllPhoneCountry()
            if (res) {
                setphoneCodes(res)
            }
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getAllPhoneCountryCode()
    }, [])


    const ValidateEmail = (email) => {
        if (!email) {
            return setEmailerrorMessage('* Email is Required')
        }
        if (!emailRegex.test(email)) {
            return setEmailerrorMessage('* Please Enter a vaild email address')
        }
        return setEmailerrorMessage('');
    }

    const ValidateContact = (number) => {
        if (!number) {
            return setContactErrorMessage('* Contact Number is Required')
        }
        if (!contactRegex.test(number)) {
            return setContactErrorMessage('* Plz enter a 10 digit number')
        }
        return setContactErrorMessage('')
    }

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
        if (name === 'email') {
            ValidateEmail(value)
        }

        if (name === 'phone') {
            ValidateContact(value)
        }
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

    const sendCoachData = async () => {
        const { first_name, last_name, email, phone,
            phone_country_code_id, gender, coach_type,
        } = formData
        if (first_name != '' && last_name != '' && email != '' && phone != '' &&
            phone_country_code_id != '', gender != '', coach_type != '') {
            if (!file) {
                editNewCoachfunc(singleCoachdata.id, formData);
            } else {
                const formDataNew = new FormData();
                formDataNew.append("first_name", formData.first_name)
                formDataNew.append("last_name", formData.last_name)
                formDataNew.append("email", formData.email)
                formDataNew.append("phone", formData.phone)
                formDataNew.append("phone_country_code_id", formData.phone_country_code_id)
                formDataNew.append("gender", formData.gender)
                formDataNew.append("coach_type", formData.coach_type)
                formDataNew.append("password", formData.password)
                formDataNew.append("password_confirmation", formData.password_confirmation)
                // 👇 image file
                formDataNew.append("profile_image", file)
                await editNewCoachfunc(singleCoachdata.id, formDataNew);
            }

        } else {
            toast.error('Plz enter all the fields...')
        }
    }



    return (
        <>
            {isLoading && <Loaders />}
            <div className='modal_wrapper' onClick={(() => seteditCoachModal(false))}></div>
            <div className='modal_div'>
                <h4>Edit a coach</h4>
                <i class="fa-solid fa-xmark" onClick={(() => seteditCoachModal(false))}></i>
                <form className='modal_form'>
                    <div className='modal_input_grid_wrapper'>
                        <Input onChange={handleChange} name="first_name" value={formData.first_name} label={'First Name'} required={true} placeholder={'Enter first name'} />
                        <Input onChange={handleChange} name='last_name' value={formData.last_name} label={'Last Name'} required={true} placeholder={'Enter last name'} />
                        <div>
                            <Input readOnly={true} onChange={handleChange} name='email' value={formData.email} label={'Email'} required={true} placeholder={'Enter email'} />
                            <small style={{
                                fontSize: '0.7rem',
                                display: 'block',
                                marginTop: '5px',
                                color: 'red'
                            }}>{updateErrors?.email ? updateErrors.email : emailerrorMessage}</small>
                        </div>

                        <div className='input_form' style={{
                            position: 'relative'
                        }}>
                            <label> Password <span>*</span></label>
                            <input onChange={handleChange} name='password' style={{
                                padding: '0 40px 0 15px '
                            }} value={formData.password} type='password' placeholder='*********' />
                            <img style={{
                                position: 'absolute',
                                top: '47px',
                                right: '10px',
                                width: '20px',
                                cursor: 'pointer'
                            }} src={eye} />

                            <small style={{
                                fontSize: '0.7rem',
                                display: 'block',
                                marginTop: '5px',
                                color: 'red'
                            }}>{updateErrors?.password ? updateErrors.password : passwordMsg}</small>
                        </div>


                        <div className='input_form' style={{
                            position: 'relative'
                        }}>
                            <label>Confirm Password <span>*</span></label>
                            <input onChange={handleChange} name='password_confirmation' style={{
                                padding: '0 40px 0 15px '
                            }} value={formData.password_confirmation} type='password' placeholder='*********' />
                            <img style={{
                                position: 'absolute',
                                top: '47px',
                                right: '10px',
                                width: '20px',
                                cursor: 'pointer'
                            }} src={eye} />
                            <small style={{
                                fontSize: '0.7rem',
                                display: 'block',
                                marginTop: '5px',
                                color: 'red'
                            }}>{updateErrors?.password_confirmation ? updateErrors.password_confirmation : confirmPasswordMsg}</small>
                        </div>
                        <div className='input_form confirm_input_form'>
                            <label>Phone no<span>*</span></label>
                            <div className='phone_input_Wrapper656'>
                                <select onChange={handleChange} value={formData.phone_country_code_id} name='phone_country_code_id' style={{
                                    border: 'none',
                                    borderRight: '2px solid #000',
                                    outline: 'none'
                                }}>
                                    {phoneCodes?.map((e,) => (
                                        <option value={e.id} key={e.id}>+ {e.phone_code}</option>
                                    ))}
                                </select>
                                <input disabled={phoneCodes?.length <= 0} onChange={handleChange} name='phone' value={formData.phone} placeholder='Enter your phone number' />

                                <small style={{
                                    fontSize: '0.7rem',
                                    display: 'block',
                                    marginTop: '5px',
                                    color: 'red'
                                }}>{updateErrors?.phone_country_code_id && updateErrors.phone_country_code_id}</small>
                            </div>
                            <small style={{
                                fontSize: '0.7rem',
                                display: 'block',
                                color: 'red',
                                marginLeft: 'auto'
                            }}>{updateErrors?.phone ? updateErrors.phone : contacterrorMessage}</small>
                        </div>


                        <div className='input_form'>
                            <label>Gender<span>*</span></label>
                            <select onChange={handleChange} name='gender' value={formData.gender}>
                                <option value=''>--Select-gender--</option>
                                <option value={'male'}>Male</option>
                                <option value={'female'}>Female</option>
                                <option value={'other'}>Other</option>
                            </select>
                            <small style={{
                                fontSize: '0.7rem',
                                display: 'block',
                                color: 'red',
                                marginLeft: 'auto'
                            }}>{updateErrors?.gender && updateErrors.gender}</small>
                        </div>



                        <div className='input_form'>
                            <label>Coach Type<span>*</span></label>
                            <select onChange={handleChange} name='coach_type' value={formData.coach_type}>
                                <option value=''>--Select-coach-type--</option>
                                <option value={'Mentor'}>Mentor</option>
                                <option value={'Yoga Trainer'}>Yoga Trainer</option>
                            </select>
                        </div>

                        <small style={{
                            fontSize: '0.7rem',
                            display: 'block',
                            color: 'red',
                            marginLeft: 'auto'
                        }}>{updateErrors?.coach_type && updateErrors.coach_type}</small>
                    </div>
                    <div className='input_form'>
                        <label style={{
                            fontSize: '15px',
                            fontWeight: '600'
                        }}>Upload Image<span>*</span></label>

                        <div className='files_upload_wrapper'>
                            {(!file && !sendCoachData?.profile?.profile_photo) && <>
                                <img src={upload} />
                                <p>Drag your files or <span>Browse</span></p>
                                <h5>Png, Jpg, Jpeg supported | file size: 250 KB</h5>
                            </>}
                            {
                                file && <img style={{
                                    width: '100%',
                                    height: '90%',
                                    objectFit: 'contain',
                                }} src={URL.createObjectURL(file)} />
                            }
                            {(sendCoachData?.profile?.profile_photo && !file) && <img style={{
                                width: '100%',
                                height: '90%',
                                objectFit: 'contain',
                            }} src={sendCoachData?.profile?.profile_photo} />}
                            <input onChange={handleFileChange} type='file' />
                        </div>
                    </div>
                    <div onClick={(() => sendCoachData())} className='change_cancel_wrapper'>
                        <Button children={'Add'} />
                    </div>
                </form>
            </div>
        </>
    )
}

export default EditCoachModal
