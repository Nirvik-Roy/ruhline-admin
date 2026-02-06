import React from 'react'
import Input from '../../../Components/Input'
import CustomTextEditor from '../../../Components/CustomTextEditor/CustomTextEditor'
import upload from '../../../assets/Vector (8).svg'
import Button from '../../../Components/Button'
import './CmsAbout.css'
const CmsAboutSections = ({ values, setvalues,
    setSectionAboutImage, sectionAboutImage, sectionDescription,
    setsectionDescription, founderDescription, setfounderDescription, founderImage, setfounderImage, onChange, missionData }) => {

    const handleChange = (e, id) => {
        const { name, value } = e.target
        setvalues(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, [name]: value } : item
            )
        );
    }

    const handleDescription = (data, id) => {
        setvalues(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, description: data } : item
            )
        );
    }

    const handleImageUpload = (e, id) => {
        setvalues(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, icon_image: e.target.files[0] } : item
            )
        );
    }
    return (
        <>
            <div className='cms_home_sections_wrapper'>
                <div className='section_dropdown_head'>
                    <h3>Section 1 (About us)</h3>
                    <div className='brown_arrow_box'>
                        <i class="fa-solid fa-angle-down"></i>
                    </div>
                </div>
                <div className='section_dropdown_content_wrapper'>
                    <div className='section_1_content_wrapper'>
                        <div className='section_1_details'>
                            <div>
                                <Input name={'sectionHeadline'} value={missionData.sectionHeadline} onChange={onChange} label={' Headline'} required={true} placeholder={'Enter about headline'} />
                            </div>

                            <div>
                                <Input name={'sectionSecondaryHeadline'} value={missionData.sectionSecondaryHeadline} onChange={onChange} label={'Secondary Headline'} required={true} placeholder={'Enter about secondary headline'} />
                            </div>

                            <div>
                                <CustomTextEditor onChange={((data) => setsectionDescription(data))} label={'Description'} required={true} defaultValue={sectionDescription} />
                            </div>

                        </div>
                        <div className='section_1_details'>
                            <div className='input_form'>
                                <label style={{
                                    fontSize: '15px',
                                }}>About Us Section Image<span>*</span></label>
                                {!sectionAboutImage && <div className='files_upload_wrapper'>
                                    <img src={upload} />
                                    <p>Drag your files or <span>Browse</span></p>
                                    <h5>Png, Jpg, Jpeg supported | file size: 250 KB</h5>
                                    <input onChange={((e) => setSectionAboutImage(e.target.files[0]))} type='file' />
                                </div>}

                                {(sectionAboutImage instanceof File) && <div className='files_upload_wrapper'>
                                    <img style={{
                                        width: '100%',
                                        height: '95%',
                                        objectFit: 'contain'
                                    }} src={URL.createObjectURL(sectionAboutImage)} />
                                    <input onChange={((e) => setSectionAboutImage(e.target.files[0]))} type='file' />
                                </div>}

                                {(typeof sectionAboutImage === 'string') && <div className='files_upload_wrapper'>
                                    <img style={{
                                        width: '100%',
                                        height: '95%',
                                        objectFit: 'contain'
                                    }} src={sectionAboutImage} />
                                    <input onChange={((e) => setSectionAboutImage(e.target.files[0]))} type='file' />
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>

                <div className='section_dropdown_head'>
                    <h3>Section 2 (Mission Vision Values)</h3>
                    <div className='brown_arrow_box'>
                        <i class="fa-solid fa-angle-down"></i>
                    </div>
                </div>

                <div className='about_mission_options_wrapper'>
                    {values.length > 0 && values?.map((e, i) => (
                        <div className='option_title_wrapper'>
                            <div className='option'>
                                <h4>Option {i + 1}</h4>
                            </div>
                            <div className='option_details_wrapper'>
                                <div>
                                    <Input value={e?.title} onChange={((event) => handleChange(event, e?.id))} name={'title'} label={'Title'} required={true} placeholder={'Enter title'} />
                                </div>

                                <div>
                                    <CustomTextEditor onChange={((data) => handleDescription(data, e?.id))} label={'Description'} required={true} defaultValue={e?.description} />
                                </div>

                                <div className='input_form'>
                                    <label style={{
                                        fontSize: '15px',
                                    }}>Upload Icon<span>*</span></label>
                                    {!e?.icon_image && <div className='files_upload_wrapper'>
                                        <img src={upload} />
                                        <p>Drag your files or <span>Browse</span></p>
                                        <h5>Png, Jpg, Jpeg supported | file size: 250 KB</h5>
                                        <input onChange={((event) => handleImageUpload(event, e?.id))} type='file' />
                                    </div>}

                                    {(e?.icon_image instanceof File) &&
                                        <div className='files_upload_wrapper'>
                                            <img style={{
                                                width: '100%',
                                                height: '95%',
                                                objectFit: 'contain'
                                            }} src={URL.createObjectURL(e?.icon_image)} />
                                            <input
                                                onChange={(event) => handleImageUpload(event, e?.id)}
                                                type='file'
                                            />
                                        </div>
                                    }

                                    {(typeof e?.icon_image === 'string') &&
                                        <div className='files_upload_wrapper'>
                                            <img style={{
                                                width: '100%',
                                                height: '95%',
                                                objectFit: 'contain'
                                            }} src={e?.icon_image} />
                                            <input
                                                onChange={(event) => handleImageUpload(event, e?.id)}
                                                type='file'
                                            />
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    ))}


                </div>


                <div className='section_dropdown_head'>
                    <h3>Section 3 (Our Founder)</h3>
                    <div className='brown_arrow_box'>
                        <i class="fa-solid fa-angle-down"></i>
                    </div>
                </div>

                <div className='section_dropdown_content_wrapper'>
                    <div className='section_1_content_wrapper'>
                        <div className='section_1_details'>
                            <div className='section_form_grid_Wrapper'>
                                <div>
                                    <Input name={'founderHeadline'} value={missionData.founderHeadline} onChange={onChange} label={' Headline'} required={true} placeholder={'Enter headline'} />
                                </div>
                                <div>
                                    <Input name={'founderSecondaryHeadline'} value={missionData.founderSecondaryHeadline} onChange={onChange} label={'Secondary Headline'} required={true} placeholder={'Enter secondary headline'} />
                                </div>

                            </div>
                            <CustomTextEditor onChange={((data) => setfounderDescription(data))} label={'Description'} required={true} defaultValue={founderDescription} />
                        </div>
                        <div className='section_1_details'>
                            <div className='input_form'>
                                <label style={{
                                    fontSize: '15px',
                                }}>Upload Image<span>*</span></label>
                                {!founderImage && <div className='files_upload_wrapper'>
                                    <img src={upload} />
                                    <p>Drag your files or <span>Browse</span></p>
                                    <h5>Png, Jpg, Jpeg supported | file size: 250 KB</h5>
                                    <input onChange={((e) => setfounderImage(e.target.files[0]))} type='file' />
                                </div>}

                                {(founderImage instanceof File) && <div className='files_upload_wrapper'>
                                    <img style={{
                                        width: '100%',
                                        height: '95%',
                                        objectFit: 'contain'
                                    }} src={URL.createObjectURL(founderImage)} />

                                    <input onChange={((e) => setfounderImage(e.target.files[0]))} type='file' />
                                </div>}

                                {(typeof founderImage === 'string') && <div className='files_upload_wrapper'>
                                    <img style={{
                                        width: '100%',
                                        height: '95%',
                                        objectFit: 'contain'
                                    }} src={founderImage} />

                                    <input onChange={((e) => setfounderImage(e.target.files[0]))} type='file' />
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default CmsAboutSections
