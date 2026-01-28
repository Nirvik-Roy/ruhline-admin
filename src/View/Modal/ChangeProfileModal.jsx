import React, { useEffect, useState } from 'react'
import upload from '../../assets/Vector (8).svg'
import Button from '../../Components/Button'
import Input from '../../Components/Input'
import { UpdateuserProfile } from '../../utils/user'
import toast from 'react-hot-toast'
import Loaders from '../../Components/Loaders/Loaders'
const ChangeProfileModal = ({ modalFunction, userDataFetch, userData }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isloading, setIsLoading] = useState(false)
    const [file, setFile] = useState(null);
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'firstName') {
            setFirstName(value)
        }
        if (name === 'lastName') {
            setLastName(value)
        }
    }
    useEffect(() => {
        userDataFetch()
    }, [])


    useEffect(() => {
        setFirstName(userData?.first_name && userData?.first_name)
        setLastName(userData?.last_name && userData?.last_name);
    }, [userData])

    const UpdateFunc = async () => {
        if (lastName != '' && firstName != '' && file != '') {
            setIsLoading(true)
            try {
                const result = await UpdateuserProfile({
                    lastName,
                    firstName,
                    file,
                    profileLink : userData?.profile_photo
                })
                await userDataFetch()
                modalFunction(0)
            } catch (err) {
                toast.error(err.response?.data?.message);
            } finally {
                setIsLoading(false)
            }
        } else {
            toast.error('Plz enter the fields to update')
        }
    }
    return (
        <>
            {isloading && <Loaders />}
            <div className='modal_wrapper' onClick={(() => modalFunction(0))}></div>
            <div className='modal_div'>
                <h4>Change Profile Picture</h4>
                <i class="fa-solid fa-xmark" onClick={(() => modalFunction(0))}></i>
                <form className='modal_form'>
                    <div className='modal_input_grid_wrapper'>
                        <Input value={firstName} onChange={handleChange} name={'firstName'} label={'First Name'} required={true} placeholder={'Bidisha'} />
                        <Input value={lastName} onChange={handleChange} name={'lastName'} label={'Last Name'} required={true} placeholder={'Bhowmick'} />
                    </div>
                    <div className='input_form'>
                        <label style={{
                            fontSize: '18px',
                            fontWeight: '600'
                        }}>Upload Profile Picture<span>*</span></label>

                        <div className='files_upload_wrapper'>
                            {
                                (() => {
                                    if (!file && !userData?.profile_photo) {
                                        return (
                                            <>
                                                <img src={upload} alt="Upload prompt" />
                                                <p>Drag your files or <span>Browse</span></p>
                                                <h5>PNG, JPG, JPEG supported | max file size: 250 KB</h5>
                                            </>
                                        );
                                    }

                                    if (file) {
                                        return (
                                            <img
                                                style={{ width: '100%', height: '90%', objectFit: 'contain' }}
                                                src={URL.createObjectURL(file)}
                                                alt="Selected preview"
                                            />
                                        );
                                    }

                                    return (
                                        <img
                                            style={{ width: '100%', height: '90%', objectFit: 'contain' }}
                                            src={userData.profile_photo}
                                            alt="Profile"
                                        />
                                    );
                                })()
                            }
                            <input onChange={handleFileChange} type='file' />
                        </div>
                    </div>

                    <div className='change_cancel_wrapper'>
                        <button onClick={(() => modalFunction(0))}>Cancel</button>
                        <div onClick={(() => UpdateFunc())}>
                            <Button children={'Change'} />

                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default ChangeProfileModal
