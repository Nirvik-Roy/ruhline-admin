import React, { useState, useEffect } from 'react'
import Button from '../../Components/Button'
import Input from '../../Components/Input'
import upload from '../../assets/Vector (8).svg'
import { getAllPhoneCountry } from '../../utils/location'
import Loaders from '../../Components/Loaders/Loaders'
import { getSingleCustomer } from '../../utils/cutomer'
import { useDispatch, useSelector } from 'react-redux'
import { EditCustomer } from '../../Store/Slices/CustomerSlice/EditCustomerSlice'
const EditCustomerModal = ({ seteditCustomer, customerId }) => {
    const [phoneData, setPhoneData] = useState([]);
    const { editLoading, isEdited, errors } = useSelector(state => state.editCustomer)
    const [singleCustomerData, setsingleCustomerdata] = useState([])
    const [isLoading, setisLoading] = useState(false);
    const [file, setFile] = useState()
    const dispatch = useDispatch()
    const [formData, setformData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        phone_country_code_id: '5',
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

    useEffect(() => {
        if (singleCustomerData) {
            setformData({
                first_name: singleCustomerData?.user?.first_name || '',
                last_name: singleCustomerData?.user?.last_name || '',
                email: singleCustomerData.user?.email || '',
                phone: singleCustomerData.profile?.phone || '',
                phone_country_code_id: singleCustomerData.profile?.phone_country_code?.id
            })
        }
    }, [singleCustomerData])


    const fetchSingleCustomer = async () => {
        setisLoading(true)
        if (customerId) {
            try {
                const result = await getSingleCustomer(customerId);
                setsingleCustomerdata(result);
            } catch (err) {
                console.log(err)
            } finally {
                setisLoading(false)
            }
        }

    }
    useEffect(() => {
        fetchSingleCustomer()
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setformData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = () => {
        const { first_name, last_name, phone, phone_country_code_id, email } = formData
        if (customerId) {
            const formDataNew = new FormData()
            formDataNew.append('first_name', first_name);
            formDataNew.append('last_name', last_name);
            formDataNew.append('phone', phone);
            formDataNew.append('phone_country_code_id', phone_country_code_id);
            { email != singleCustomerData.user?.email && formDataNew.append('email', email) }
            { file && formDataNew.append('profile_image', file) }
            dispatch(EditCustomer(
                {
                    id: customerId,
                    formData: formDataNew,
                }
            ))
        }
    }
    return (
        <>
            {(isLoading || editLoading) && <Loaders />}
            <div className='modal_wrapper' onClick={(() => seteditCustomer(false))}></div>
            <div className='modal_div'>
                <h4>Edit Customer </h4>
                <i class="fa-solid fa-xmark" onClick={(() => seteditCustomer(false))}></i>
                <form className='modal_form'>
                    <div className='modal_input_grid_wrapper'>
                        <div>
                            <Input onChange={handleChange} value={formData.first_name} name={'first_name'} label={'First Name'} required={true} placeholder={'Enter First Name'} />
                            <small style={{
                                fontSize: '0.7rem',
                                display: 'block',
                                marginTop: '5px',
                                color: 'red'
                            }}>{errors?.first_name && errors?.first_name[0]}</small>
                        </div>
                        <div>
                            <Input onChange={handleChange} value={formData.last_name} name={'last_name'} label={'Last Name'} required={true} placeholder={'Enter Last Name'} />
                            <small style={{
                                fontSize: '0.7rem',
                                display: 'block',
                                marginTop: '5px',
                                color: 'red'
                            }}>{errors?.last_name && errors?.last_name[0]}</small>
                        </div>
                        <div>
                            <Input onChange={handleChange} value={formData.email} name={'email'} label={'Email'} required={true} placeholder={'Enter Email address'} />
                            <small style={{
                                fontSize: '0.7rem',
                                display: 'block',
                                marginTop: '5px',
                                color: 'red'
                            }}>{errors?.email && errors?.email[0]}</small>
                        </div>
                        <div className='input_form confirm_input_form'>
                            <label>Phone no<span>*</span></label>
                            <div className='phone_input_Wrapper656'>
                                <select onChange={handleChange} name='phone_country_code_id' value={formData.phone_country_code_id} style={{
                                    border: 'none',
                                    borderRight: '2px solid #000',
                                    outline: 'none'
                                }}>
                                    {phoneData?.map((e) => (
                                        <option value={e.id} key={e.id}>+{e.phone_code}</option>
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
                            {(!file && !singleCustomerData?.profile?.profile_image) && (
                                <>
                                    <img src={upload} alt="Upload Placeholder" />
                                    <p>Drag your files or <span>Browse</span></p>
                                    <h5>Png, Jpg, Jpeg supported | file size: 250 KB</h5>
                                </>
                            )}

                            {(!file && singleCustomerData?.profile?.profile_image) && (
                                <img
                                    style={{
                                        width: '100%',
                                        height: '90%',
                                        objectFit: 'contain',
                                    }}
                                    src={singleCustomerData?.profile?.profile_image}
                                    alt="Profile"
                                />
                            )}

                            {file && (
                                <img
                                    style={{
                                        width: '100%',
                                        height: '90%',
                                        objectFit: 'contain',
                                    }}
                                    src={URL.createObjectURL(file)}
                                    alt="Selected"
                                />
                            )}
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
                        <Button children={'Save'} />
                    </div>
                </form>
            </div>
        </>
    )
}

export default EditCustomerModal
