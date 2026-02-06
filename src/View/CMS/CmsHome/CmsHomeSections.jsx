import React, { useState } from 'react'
import Input from '../../../Components/Input.jsx'
import CustomTextEditor from '../../../Components/CustomTextEditor/CustomTextEditor.jsx'
import upload from '../../../assets/Vector (8).svg'
import Button from '../../../Components/Button.jsx'
import Loaders from '../../../Components/Loaders/Loaders.jsx'
const CmsHomeSections = () => {
    const [optionsData, setoptionsData] = useState([
        {
            id: 1,
            title: '',
            description: ''
        }
    ])
    const [loading, setloading] = useState(false)
    const [heroDescription, setherodescription] = useState('');
    const [aboutDescription, setaboutDescription] = useState('');
    const [heroSectionImage, setheroSectionImage] = useState();
    const [aboutSectionImage, setaboutSectionImage] = useState();
    const [whyChooseImage, setwhyChooseImage] = useState();
    const [whyChooseBackgroundImage, setwhychooseBackgroundImage] = useState()

    const addOptions = () => {
        setoptionsData([
            ...optionsData,
            {
                id: Date.now(),
                title: '',
                description: ''
            }
        ])
    }
    const hanleOptionChanges = (e, id) => {
        const { name, value } = e.target
        setoptionsData((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, [name]: value } : item
            )
        );
    }
    const deleteFunc = (id) => {
        if (id != 1) {
            const dummyData = [...optionsData];
            const filteredData = dummyData.filter((e) => e.id != id);
            setoptionsData(filteredData)
        }
    }

    const [homepageFormData, sethomepageformData] = useState({
        hero_headline: '',
        about_headline: '',
        about_secondary_headline: '',
        about_button_name: '',
        about_button_url: '',
        programs_headline: '',
        programs_secondary_headline: '',
        why_choose_us_headline: '',
        why_choose_use_secondary_headline: '',
        why_choose_us_section_image: '',
        why_choose_us_background_image: '',
        coaches_headline: '',
        coaches_secondary_headline: '',
        articles_headline: '',
        articles_secondary_headline: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        sethomepageformData({
            ...homepageFormData,
            [name]: value
        })
    }

    const handleSubmit = async () => {
        try {
            setloading(true);
            const formData = new FormData();
            { homepageFormData.hero_headline && formData.append('section_01[hero_headline]', homepageFormData.hero_headline) }

            { heroSectionImage instanceof File && formData.append('section_01[hero_section_image]', heroSectionImage) }

            { heroDescription && formData.append('section_01[hero_description]', heroDescription) }

            { homepageFormData.about_headline && formData.append('section_02[headline]', homepageFormData.about_headline) }

            { aboutSectionImage instanceof File && formData.append('section_02[about_us_section_image]', aboutSectionImage) }

            { homepageFormData.about_secondary_headline && formData.append('section_02[secondary_headline]', homepageFormData.about_secondary_headline) }

            { aboutDescription && formData.append('section_02[description]', aboutDescription) }

            { homepageFormData.about_button_name && formData.append('section_02[button_name]', homepageFormData.about_button_name) }

            { homepageFormData.about_button_url && formData.append('section_02[button_url]', homepageFormData.about_button_url) }

            { homepageFormData.programs_headline && formData.append('section_03[headline]', homepageFormData.programs_headline) }

            { homepageFormData.programs_secondary_headline && formData.append('section_03[secondary_headline]', homepageFormData.programs_secondary_headline) }

            { homepageFormData.why_choose_us_headline && formData.append('section_04[headline]', homepageFormData.why_choose_us_headline) }

            { homepageFormData.why_choose_use_secondary_headline && formData.append('section_04[secondary_headline]', homepageFormData.why_choose_use_secondary_headline) }

            { whyChooseImage instanceof File && formData.append('section_04[why_choose_us_section_image]', homepageFormData.why_choose_use_secondary_headline) }

            { whyChooseBackgroundImage instanceof File && formData.append('section_04[background_image]', homepageFormData.why_choose_use_secondary_headline) }

            if (optionsData.length > 0) {
                optionsData.forEach((e, index) => {
                    if (e?.description) {
                        formData.append(`section_04[options][${index}][description]`, e.description);
                    }

                    if (e?.title) {
                        formData.append(`section_04[options][${index}][title]`, e.title)
                    }
                    formData.append(`section_04[options][${index}][sort_order]`, index)
                });
            }
            { homepageFormData.coaches_headline && formData.append('section_05[headline]', homepageFormData.coaches_headline) }

            { homepageFormData.coaches_secondary_headline && formData.append('section_05[secondary_headline]', homepageFormData.coaches_secondary_headline) }

            { homepageFormData.articles_headline && formData.append('section_06[headline]', homepageFormData.articles_headline) }

            { homepageFormData.articles_secondary_headline && formData.append('section_06[secondary_headline]', homepageFormData.articles_secondary_headline) }

        } catch (err) {
            console.log(err)
        } finally {
            setloading(false)
        }
    }
    return (
        <>
            {loading && <Loaders />}
            <div className='cms_home_sections_wrapper'>
                <div className='section_dropdown_head'>
                    <h3>Section 1 (Hero Section)</h3>
                    <div className='brown_arrow_box'>
                        <i class="fa-solid fa-angle-down"></i>
                    </div>
                </div>

                <div className='section_dropdown_content_wrapper'>
                    <div className='section_1_content_wrapper'>
                        <div className='section_1_details'>
                            <div>
                                <Input value={homepageFormData.hero_headline} name={'hero_headline'} onChange={handleChange} label={'Hero Headline'} required={true} placeholder={'Enter hero headline'} />
                            </div>
                            <div>
                                <CustomTextEditor onChange={((data) => setherodescription(data))} label={'Hero Description'} required={true} defaultValue={heroDescription} />
                            </div>
                        </div>
                        <div className='section_1_details'>
                            <div className='input_form'>
                                <label style={{
                                    fontSize: '15px',
                                }}>Upload Hero Section Image<span>*</span></label>
                                <div className='files_upload_wrapper'>
                                    <img src={upload} />
                                    <p>Drag your files or <span>Browse</span></p>
                                    <h5>Png, Jpg, Jpeg supported | file size: 250 KB</h5>
                                    <input onChange={((e) => setheroSectionImage(e.target.files[0]))} type='file' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className='section_dropdown_head'>
                    <h3>Section 2 (About Us)</h3>
                    <div className='brown_arrow_box'>
                        <i class="fa-solid fa-angle-down"></i>
                    </div>
                </div>


                <div className='section_dropdown_content_wrapper'>
                    <div className='section_1_content_wrapper'>
                        <div className='section_1_details'>
                            <div>
                                <Input onChange={handleChange} value={homepageFormData.about_headline} name={'about_headline'} label={'Headline'} required={true} placeholder={'Enter about use heading'} />
                            </div>
                            <div>
                                <Input onChange={handleChange} value={homepageFormData.about_secondary_headline} label={'Secondary Headline'} required={true} placeholder={'Enter about seconday headline'} />
                            </div>
                            <div>
                                <CustomTextEditor onChange={((data) => setaboutDescription(data))} label={'Description'} required={true} defaultValue={aboutDescription} />
                            </div>

                            <div className='section_form_grid_Wrapper'>
                                <div>
                                    <Input name={'about_button_name'} onChange={handleChange} value={homepageFormData.about_button_name} label={'Button Name'} required={true} placeholder={'Enter button name'} />
                                </div>
                                <div>
                                    <Input name={'about_button_url'} label={'Button Url'} value={homepageFormData.about_button_url} onChange={handleChange} required={true} placeholder={'Enter button url'} />
                                </div>

                            </div>
                        </div>
                        <div className='section_1_details'>
                            <div className='input_form'>
                                <label style={{
                                    fontSize: '15px',
                                }}>Upload About Us Section Image<span>*</span></label>
                                <div className='files_upload_wrapper'>
                                    <img src={upload} />
                                    <p>Drag your files or <span>Browse</span></p>
                                    <h5>Png, Jpg, Jpeg supported | file size: 250 KB</h5>
                                    <input onChange={((e) => setaboutSectionImage(e.target.files[0]))} type='file' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className='section_dropdown_head'>
                    <h3>Section 3 (Programs)</h3>
                    <div className='brown_arrow_box'>
                        <i class="fa-solid fa-angle-down"></i>
                    </div>
                </div>

                <div className='section_dropdown_content_wrapper'>
                    <div className='program_section_grid_wrapper'>
                        <div>
                            <Input name={'programs_headline'} value={homepageFormData.programs_headline} label={' Headline'} required={true} placeholder={'Enter programs headline'} />

                        </div>
                        <div>
                            <Input name={'programs_secondary_headline'} onChange={homepageFormData.programs_secondary_headline} label={'Secondary Headline'} required={true} placeholder={'Enter program secondary headline'} />
                        </div>

                    </div>
                </div>

                <div className='section_gap'></div>


                <div className='section_dropdown_head'>
                    <h3>Section 4 (Why choose us)</h3>
                    <div className='brown_arrow_box'>
                        <i class="fa-solid fa-angle-down"></i>
                    </div>
                </div>

                <div className='section_dropdown_content_wrapper'>
                    <div className='program_section_grid_wrapper'>
                        <div>
                            <Input onChange={handleChange} value={homepageFormData.why_choose_us_headline} name={'why_choose_us_headline'} label={' Headline'} required={true} placeholder={'Enter why choose us heading..'} />

                        </div>
                        <div>
                            <Input onChange={handleChange} value={homepageFormData.why_choose_use_secondary_headline} label={'Secondary Headline'} required={true} defaultValue={'Enter why choose us secondary headline'} />
                        </div>

                        <div className='input_form'>
                            <label style={{
                                fontSize: '15px',
                            }}>Why choose us Section Image<span>*</span></label>
                            <div className='files_upload_wrapper'>
                                <img src={upload} />
                                <p>Drag your files or <span>Browse</span></p>
                                <h5>Png, Jpg, Jpeg supported | file size: 250 KB</h5>
                                <input onChange={((e) => setwhyChooseImage(e.target.files[0]))} type='file' />
                            </div>
                        </div>
                        <div className='input_form'>
                            <label style={{
                                fontSize: '15px',
                            }}>Upload Background Image<span>*</span></label>
                            <div className='files_upload_wrapper'>
                                <img src={upload} />
                                <p>Drag your files or <span>Browse</span></p>
                                <h5>Png, Jpg, Jpeg supported | file size: 250 KB</h5>
                                <input onChange={((e) => setwhychooseBackgroundImage(e.target.files[0]))} type='file' />
                            </div>
                        </div>
                        <div className='option_border_wrapper'>
                            {optionsData.map((element, i) => (
                                <div className='option_title_wrapper'>
                                    <div className='option'>
                                        <h4>Option {i + 1}</h4>
                                        <i onClick={(() => deleteFunc(element?.id))} class="fa-regular fa-trash-can"></i>
                                    </div>
                                    <div className='option_details_wrapper'>
                                        <div>
                                            <Input onChange={((e) => hanleOptionChanges(e, element?.id))} value={element.title} label={'Title'} name={'title'} required={true} placeholder={'Enter option title'} />
                                        </div>
                                        <Input onChange={((e) => hanleOptionChanges(e, element?.id))} value={element.description} label={'Description'} name={'description'} required={true} placeholder={'Enter description '} />
                                    </div>
                                </div>
                            ))}

                            <div onClick={(() => { addOptions() })} style={{
                                marginTop: '20px'
                            }}>
                                <Button children={'Add another option'} styles={{
                                    border: '1px solid var(--primary-color)',
                                    color: 'var(--text-color)',
                                    backgroundColor: 'transparent',
                                    marginLeft: 'auto'
                                }} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='section_dropdown_head'>
                    <h3>Section 5 (Coaches)</h3>
                    <div className='brown_arrow_box'>
                        <i class="fa-solid fa-angle-down"></i>
                    </div>
                </div>
                <div className='section_dropdown_content_wrapper'>
                    <div className='program_section_grid_wrapper'>
                        <Input label={' Headline'} required={true} defaultValue={'Programs'} />
                        <Input label={'Secondary Headline'} required={true} defaultValue={'Align your body. Center your mind.'} />
                    </div>
                </div>
                <div className='section_gap'></div>
                <div className='section_dropdown_head'>
                    <h3>Section 6 (Articles)</h3>
                    <div className='brown_arrow_box'>
                        <i class="fa-solid fa-angle-down"></i>
                    </div>
                </div>
                <div className='section_dropdown_content_wrapper'>
                    <div className='program_section_grid_wrapper'>
                        <Input label={' Headline'} required={true} defaultValue={'Programs'} />
                        <Input label={'Secondary Headline'} required={true} defaultValue={'Align your body. Center your mind.'} />
                    </div>
                </div>
            </div>

        </>
    )
}

export default CmsHomeSections
