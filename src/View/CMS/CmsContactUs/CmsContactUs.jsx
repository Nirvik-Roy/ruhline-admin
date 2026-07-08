import React, { useEffect, useState } from 'react'
import Button from '../../../Components/Button'
import Input from '../../../Components/Input'
import upload from '../../../assets/Vector (8).svg'
import { useNavigate } from 'react-router-dom'
import { getContactPage, updateContactPage } from '../../../utils/cms'
import Loaders from '../../../Components/Loaders/Loaders'

const CmsContactUs = () => {
    const navigate = useNavigate()
    const [loading, setloading] = useState(false)
    const [postloading, setpostloading] = useState(false)
    const [contactErrors, setcontactErrors] = useState()
    const [sideImage, setsideImage] = useState()
    const [contactForm, setcontactForm] = useState({
        heading: '',
        subheading: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setcontactForm({
            ...contactForm,
            [name]: value
        })
    }

    const fetchContactPage = async () => {
        try {
            setloading(true)
            const res = await getContactPage()
            if (res?.data) {
                setcontactForm({
                    heading: res.data.heading || '',
                    subheading: res.data.subheading || ''
                })
                setsideImage(res.data.side_image || null)
            }
        } catch (err) {
            console.log(err)
        } finally {
            setloading(false)
        }
    }

    useEffect(() => {
        fetchContactPage()
    }, [])

    const handleSubmit = async () => {
        try {
            setpostloading(true)
            const formData = new FormData()
            formData.append('heading', contactForm.heading || '')
            formData.append('subheading', contactForm.subheading || '')
            if (sideImage instanceof File) {
                formData.append('side_image', sideImage)
            }
            const res = await updateContactPage(formData)
            if (res?.errors) {
                setcontactErrors(res)
            } else if (res?.success) {
                fetchContactPage()
            }
        } catch (err) {
            console.log(err)
        } finally {
            setpostloading(false)
        }
    }

    const handleCancel = () => {
        setcontactForm({
            heading: '',
            subheading: ''
        })
        setsideImage(null)
        setcontactErrors()
    }

    return (
        <>
            {loading && <Loaders />}
            <div className='dashboard_container'>
                <div className='coaches_head_wrapper single_coach_head'>
                    <div>
                        <h1>Contact Us</h1>
                        <small>
                            <span onClick={() => navigate('/dashboard/cms')}>CMS</span> /{' '}
                            <span onClick={() => navigate('/dashboard/cms/contact-us')}>Contact Us</span>
                        </small>
                    </div>

                    <div className='coaches_button_wapper'>
                        <div onClick={handleCancel}>
                            <Button
                                children={'Cancel'}
                                styles={{
                                    color: 'var(--text-color)',
                                    border: 'none',
                                    padding: '12px 15px',
                                    background: 'transparent',
                                    fontSize: '17px',
                                    fontWeight: '600'
                                }}
                            />
                        </div>
                        <div onClick={handleSubmit}>
                            <Button
                                loading={postloading}
                                loadingText='Saving...'
                                children={'Save'}
                                styles={{
                                    fontSize: '15px'
                                }}
                            />
                        </div>
                    </div>
                </div>

                {!loading && (
                    <div style={{ marginTop: '20px' }}>
                        <Input
                            name='heading'
                            value={contactForm.heading}
                            onChange={handleChange}
                            label={'Heading'}
                            placeholder={'Enter heading'}
                        />
                        {contactErrors?.heading && (
                            <small style={{ color: 'red', marginLeft: '15px', marginTop: '10px' }}>
                                {contactErrors.heading[0]}
                            </small>
                        )}

                        <Input
                            style={{
                                margin:'20px 0'
                            }}
                            name='subheading'
                            value={contactForm.subheading}
                            onChange={handleChange}
                            label={'Subheading'}
                            placeholder={'Enter subheading'}
                        />
                        {contactErrors?.subheading && (
                            <small style={{ color: 'red', marginLeft: '15px', marginTop: '10px' }}>
                                {contactErrors.subheading[0]}
                            </small>
                        )}

                        <div className='input_form'>
                            <label style={{ fontSize: '15px' }}>Contact Image</label>
                            <div className='files_upload_wrapper'>
                                {!sideImage && (
                                    <>
                                        <img src={upload} />
                                        <p>
                                            Drag your files or <span>Browse</span>
                                        </p>
                                        <h5>Png, Jpg, Jpeg supported | file size: 250 KB</h5>
                                    </>
                                )}
                                {sideImage instanceof File && (
                                    <img
                                        style={{
                                            width: '100%',
                                            height: '95%',
                                            objectFit: 'contain'
                                        }}
                                        src={URL.createObjectURL(sideImage)}
                                    />
                                )}
                                {typeof sideImage === 'string' && (
                                    <img
                                        style={{
                                            width: '100%',
                                            height: '95%',
                                            objectFit: 'contain'
                                        }}
                                        src={sideImage}
                                    />
                                )}
                                <input
                                    onChange={(e) => setsideImage(e.target.files[0])}
                                    type='file'
                                />
                            </div>
                            {contactErrors?.side_image && (
                                <small style={{ color: 'red', marginLeft: '15px', marginTop: '10px' }}>
                                    {contactErrors.side_image[0]}
                                </small>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default CmsContactUs
