import React, { useEffect, useState } from 'react'
import Input from '../../../Components/Input.jsx'
import CustomTextEditor from '../../../Components/CustomTextEditor/CustomTextEditor.jsx'
import upload from '../../../assets/Vector (8).svg'
import Button from '../../../Components/Button.jsx'
import Loaders from '../../../Components/Loaders/Loaders.jsx'
import { useNavigate } from 'react-router-dom'
import './CmsHome.css'
import { getAllCmsData, putAllCmsData } from '../../../utils/cms.js'
const CmsHome = () => {
    const navigate = useNavigate();
    const [homepageErrors, sethomePageErrors] = useState()
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
    const [whyChooseBackgroundImage, setwhychooseBackgroundImage] = useState();
    const [singleHomePageData, setsingleHomePageData] = useState()

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
        if (id != 1 && optionsData.length != 1) {
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
            formData.append('section_01[hero_headline]', homepageFormData?.hero_headline || '');

            if (heroSectionImage instanceof File) {
                formData.append('section_01[hero_section_image]', heroSectionImage);
            }

            formData.append('section_01[hero_description]', heroDescription || "");


            formData.append('section_02[headline]', homepageFormData?.about_headline || "");


            if (aboutSectionImage instanceof File) {
                formData.append('section_02[about_us_section_image]', aboutSectionImage);
            }


            formData.append('section_02[secondary_headline]', homepageFormData?.about_secondary_headline || "");



            formData.append('section_02[description]', aboutDescription || "");


            if (homepageFormData.about_button_name) {
                formData.append('section_02[button_name]', homepageFormData?.about_button_name);
            }


            formData.append('section_02[button_url]', homepageFormData?.about_button_url || "");


            formData.append('section_03[headline]', homepageFormData?.programs_headline || "");




            formData.append('section_03[secondary_headline]', homepageFormData?.programs_secondary_headline || "");



            formData.append('section_04[headline]', homepageFormData?.why_choose_us_headline || "");



            formData.append('section_04[secondary_headline]', homepageFormData?.why_choose_use_secondary_headline || "");


            if (whyChooseImage instanceof File) {
                formData.append('section_04[why_choose_us_section_image]', whyChooseImage);
            }

            if (whyChooseBackgroundImage instanceof File) {
                formData.append('section_04[background_image]', whyChooseBackgroundImage);
            }


            if (optionsData.length > 0) {
                optionsData?.forEach((e, index) => {
                    if (e?.description) {
                        formData.append(`section_04[options][${index}][description]`, e.description);
                    }

                    if (e?.title) {
                        formData.append(`section_04[options][${index}][title]`, e.title)
                    }
                    formData.append(`section_04[options][${index}][sort_order]`, index)
                });
            }
            { formData.append('section_05[headline]', homepageFormData.coaches_headline || "") }

            { formData.append('section_05[secondary_headline]', homepageFormData.coaches_secondary_headline || "") }

            { formData.append('section_06[headline]', homepageFormData.articles_headline || "") }

            { formData.append('section_06[secondary_headline]', homepageFormData.articles_secondary_headline || "") }

            const res = await putAllCmsData('/admin/home-page', formData);
            sethomePageErrors(res)
        } catch (err) {
            console.log(err)
        } finally {
            setloading(false)
        }
    }

    const fetchData = async () => {
        try {
            setloading(true);
            const res = await getAllCmsData('/admin/home-page');
            setsingleHomePageData(res?.data)
            console.log(res?.data)

        } catch (err) {
            console.log(err)
        } finally {
            setloading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        sethomepageformData({
            hero_headline: singleHomePageData?.section_01?.hero_headline || '',
            about_headline: singleHomePageData?.section_02?.headline || '',
            about_secondary_headline: singleHomePageData?.section_02?.secondary_headline || '',
            about_button_name: singleHomePageData?.section_02?.button_name || '',
            about_button_url: singleHomePageData?.section_02?.button_url || '',
            programs_headline: singleHomePageData?.section_03?.headline || '',
            programs_secondary_headline: singleHomePageData?.section_03?.secondary_headline || '',
            why_choose_us_headline: singleHomePageData?.section_04?.headline || '',
            why_choose_use_secondary_headline: singleHomePageData?.section_04?.secondary_headline || '',
            coaches_headline: singleHomePageData?.section_05?.headline || '',
            coaches_secondary_headline: singleHomePageData?.section_05?.secondary_headline || '',
            articles_headline: singleHomePageData?.section_06
                ?.headline || '',
            articles_secondary_headline: singleHomePageData?.section_06?.secondary_headline || ''
        })
        setoptionsData(singleHomePageData?.section_04?.options)
        setheroSectionImage(singleHomePageData?.section_01?.hero_section_image || null)
        setherodescription(singleHomePageData?.section_01?.hero_description || '')
        setaboutDescription(singleHomePageData?.section_02?.description || '')
        setaboutSectionImage(singleHomePageData?.section_02?.about_us_section_image || null)
        setwhyChooseImage(singleHomePageData?.section_04?.why_choose_us_section_image || null)
        setwhychooseBackgroundImage(singleHomePageData?.section_04?.background_image || null)
    }, [singleHomePageData])
    return (
        <>
            {loading && <Loaders />}
            <div className='dashboard_container'>
                <div className='coaches_head_wrapper single_coach_head'>
                    <div>
                        <h1>Home</h1>
                        <small> <span onClick={(() => navigate('/dashboard/cms'))}>CMS</span> / <span onClick={(() => navigate('/dashboard/cms/cms-home'))}>Home</span></small>
                    </div>

                    <div className='coaches_button_wapper'>
                        <div>
                            <Button children={'Cancel'} styles={{
                                color: 'var(--text-color)',
                                border: 'none',
                                padding: '12px 15px',
                                background: 'transparent',
                                fontSize: '17px',
                                fontWeight: '600'
                            }} />
                        </div>

                        <div onClick={(() => handleSubmit())}>
                            <Button children={'Save'} styles={{
                                fontSize: '15px'
                            }} />
                        </div>
                    </div>
                </div>
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
                                    {(!heroSectionImage && !(heroSectionImage instanceof File)) && (
                                        <div className='files_upload_wrapper'>
                                            <img src={upload} alt="Upload icon" />
                                            <p>Drag your files or <span>Browse</span></p>
                                            <h5>Png, Jpg, Jpeg supported | file size: 250 KB</h5>
                                            <input
                                                type='file'
                                                onChange={(e) => setheroSectionImage(e.target.files[0])}
                                            />
                                        </div>
                                    )}

                                    {heroSectionImage instanceof File && (
                                        <div className='files_upload_wrapper'>
                                            <img style={{
                                                width: '100%',
                                                height: '95%',
                                                objectFit: 'contain'
                                            }} src={URL.createObjectURL(heroSectionImage)} />
                                            <input
                                                type='file'
                                                onChange={(e) => setheroSectionImage(e.target.files[0])}
                                            />
                                        </div>
                                    )}

                                    {typeof heroSectionImage === "string" && (
                                        <div className='files_upload_wrapper'>
                                            <img style={{
                                                width: '100%',
                                                height: '95%',
                                                objectFit: 'contain'
                                            }} src={heroSectionImage} />
                                            <input
                                                type='file'
                                                onChange={(e) => setheroSectionImage(e.target.files[0])}
                                            />
                                        </div>
                                    )}
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
                                    <Input onChange={handleChange} value={homepageFormData.about_secondary_headline} name={'about_secondary_headline'} label={'Secondary Headline'} required={true} placeholder={'Enter about seconday headline'} />
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
                                    {(!aboutSectionImage && !(aboutSectionImage instanceof File)) && (
                                        <div className='files_upload_wrapper'>
                                            <img src={upload} alt="Upload icon" />
                                            <p>Drag your files or <span>Browse</span></p>
                                            <h5>Png, Jpg, Jpeg supported | file size: 250 KB</h5>
                                            <input
                                                type='file'
                                                onChange={(e) => setaboutSectionImage(e.target.files[0])}
                                            />
                                        </div>
                                    )}

                                    {aboutSectionImage instanceof File && (
                                        <div className='files_upload_wrapper'>
                                            <img style={{
                                                width: '100%',
                                                height: '95%',
                                                objectFit: 'contain'
                                            }} src={URL.createObjectURL(aboutSectionImage)} />
                                            <input
                                                type='file'
                                                onChange={(e) => setaboutSectionImage(e.target.files[0])}
                                            />
                                        </div>
                                    )}

                                    {typeof aboutSectionImage === "string" && (
                                        <div className='files_upload_wrapper'>
                                            <img style={{
                                                width: '100%',
                                                height: '95%',
                                                objectFit: 'contain'
                                            }} src={aboutSectionImage} />
                                            <input
                                                type='file'
                                                onChange={(e) => setaboutSectionImage(e.target.files[0])}
                                            />
                                        </div>
                                    )}
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
                                <Input name={'programs_headline'} onChange={handleChange} value={homepageFormData.programs_headline} label={' Headline'} required={true} placeholder={'Enter programs headline'} />

                            </div>
                            <div>
                                <Input name={'programs_secondary_headline'} onChange={handleChange} value={homepageFormData.programs_secondary_headline} label={'Secondary Headline'} required={true} placeholder={'Enter program secondary headline'} />
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
                                <Input onChange={handleChange} name={'why_choose_use_secondary_headline'} value={homepageFormData.why_choose_use_secondary_headline} label={'Secondary Headline'} required={true} placeholder={'Enter why choose us secondary headline'} />
                            </div>

                            <div className='input_form'>
                                <label style={{
                                    fontSize: '15px',
                                }}>Why choose us Section Image<span>*</span></label>
                                {(!whyChooseImage && !(whyChooseImage instanceof File)) && (
                                    <div className='files_upload_wrapper'>
                                        <img src={upload} alt="Upload icon" />
                                        <p>Drag your files or <span>Browse</span></p>
                                        <h5>Png, Jpg, Jpeg supported | file size: 250 KB</h5>
                                        <input
                                            type='file'
                                            onChange={(e) => setwhyChooseImage(e.target.files[0])}
                                        />
                                    </div>
                                )}

                                {whyChooseImage instanceof File && (
                                    <div className='files_upload_wrapper'>
                                        <img style={{
                                            width: '100%',
                                            height: '95%',
                                            objectFit: 'contain'
                                        }} src={URL.createObjectURL(whyChooseImage)} />
                                        <input
                                            type='file'
                                            onChange={(e) => setwhyChooseImage(e.target.files[0])}
                                        />
                                    </div>
                                )}

                                {typeof whyChooseImage === "string" && (
                                    <div className='files_upload_wrapper'>
                                        <img style={{
                                            width: '100%',
                                            height: '95%',
                                            objectFit: 'contain'
                                        }} src={whyChooseImage} />
                                        <input
                                            type='file'
                                            onChange={(e) => setwhyChooseImage(e.target.files[0])}
                                        />
                                    </div>
                                )}
                            </div>
                            <div className='input_form'>
                                <label style={{
                                    fontSize: '15px',
                                }}>Upload Background Image<span>*</span></label>
                                {(!whyChooseBackgroundImage && !(whyChooseBackgroundImage instanceof File)) && (
                                    <div className='files_upload_wrapper'>
                                        <img src={upload} alt="Upload icon" />
                                        <p>Drag your files or <span>Browse</span></p>
                                        <h5>Png, Jpg, Jpeg supported | file size: 250 KB</h5>
                                        <input
                                            type='file'
                                            onChange={(e) => setwhychooseBackgroundImage(e.target.files[0])}
                                        />
                                    </div>
                                )}

                                {whyChooseBackgroundImage instanceof File && (
                                    <div className='files_upload_wrapper'>
                                        <img style={{
                                            width: '100%',
                                            height: '95%',
                                            objectFit: 'contain'
                                        }} src={URL.createObjectURL(whyChooseBackgroundImage)} />
                                        <input
                                            type='file'
                                            onChange={(e) => setwhychooseBackgroundImage(e.target.files[0])}
                                        />
                                    </div>
                                )}

                                {typeof whyChooseBackgroundImage === "string" && (
                                    <div className='files_upload_wrapper'>
                                        <img style={{
                                            width: '100%',
                                            height: '95%',
                                            objectFit: 'contain'
                                        }} src={whyChooseBackgroundImage} />
                                        <input
                                            type='file'
                                            onChange={(e) => setwhychooseBackgroundImage(e.target.files[0])}
                                        />
                                    </div>
                                )}
                            </div>
                            <div className='option_border_wrapper'>
                                {optionsData?.map((element, i) => (
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
                            <Input onChange={handleChange} name={'coaches_headline'} value={homepageFormData.coaches_headline} label={' Headline'} required={true} placeholder
                                ={'Enter coach headline'} />
                            <Input name={'coaches_secondary_headline'} onChange={handleChange} value={homepageFormData.coaches_secondary_headline} label={'Secondary Headline'} required={true} placeholder
                                ={'Enter coach secondary headline'} />
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
                            <div>
                                <Input name={'articles_headline'} onChange={handleChange} value={homepageFormData.articles_headline} label={' Headline'} required={true} placeholder={'Enter article headline'} />
                            </div>
                            <Input name={'articles_secondary_headline'} onChange={handleChange} value={homepageFormData.articles_secondary_headline} label={'Secondary Headline'} required={true} placeholder={'Enter article secondary headline'} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CmsHome
