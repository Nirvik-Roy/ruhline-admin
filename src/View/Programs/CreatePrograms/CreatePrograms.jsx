import React, { Activity, useEffect, useState } from 'react'
import './CreatePrograms.css'
import Button from '../../../Components/Button'
import { useNavigate } from 'react-router-dom'
import Input from '../../../Components/Input'
import Textarea from '../../../Components/Textarea.jsx'
import upload from '../../../assets/Vector (8).svg'
import ProgramsFaqContent from './ProgramsFaqContent.jsx'
import CreateProgramsBenefits from './CreateProgramsBenefits.jsx'
import CreateProgramsHowWorks from './CreateProgramsHowWorks.jsx'
import OccurenceType from './OccurenceType.jsx'
import PricingContent from './PricingContent.jsx'
import SelectCoaches from './SelectCoaches.jsx'
import CoachCommission from './CoachCommission.jsx'
import TagContent from './TagContent.jsx'
import CustomTextEditor from '../../../Components/CustomTextEditor/CustomTextEditor.jsx'
import { getAllCoaches } from '../../../utils/coach'
import Loaders from '../../../Components/Loaders/Loaders.jsx'
import { createProgram, getAllPrograms, getGlobalComission } from '../../../utils/Program.js'
import toast from 'react-hot-toast'
const CreatePrograms = () => {
    const navigate = useNavigate()
    const [index, setIndex] = useState(1);
    const [selectedPrograms, setSelectedPrograms] = useState([]);
    const [loading, setloading] = useState(false);
    const [allcoach, setallCoach] = useState([])
    const [data, setdata] = useState()
    const [dynamicFaq, setdynamicFaq] = useState([])
    const [dynamicBenefits, setdynamicBenefits] = useState([])
    const [faqImage, setfaqImage] = useState()
    const [benefitImage, setbenefitImage] = useState()
    const [dynamicHowItWorks, setdynamicHowItWorks] = useState([])
    const [HowItWorksImage, setHowItWorksImage] = useState();
    const [allProgramsCategory, setallProgramsCategory] = useState([]);
    const [mainImage, setmainImage] = useState();
    const [programCategoryId, setprogramCategoryId] = useState();
    const [programDescription, setprogramDescription] = useState();
    const [occurenceType, setoccurenceType] = useState('One Time')
    const [galleryImage, setgalleryImage] = useState([]);
    const [commissionTab, setcommissionTab] = useState('Global Commission');
    const [programErrors, setprogramErrors] = useState()
    const [staticdata, setstaticdata] = useState({
        name: '',
        oneTimeSession: '',
        tenureWeeks: '',
        noofSessions: '',
        recurringSession: '',
        originalPrice: '',
        salePrice: '',
        customcommisionRate: '',
        tag: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setstaticdata({
            ...staticdata,
            [name]: value
        })
    }
    const fetchCommisionValue = async () => {
        setloading(true)
        const res = await getGlobalComission()
        setdata(res?.data)
        setloading(false)
    }

    const handleGalleryImages = (e) => {
        const mappedData = [...e.target.files]?.map((e, index) => (
            {
                id: Date.now() + index,
                img: e
            }
        ))
        setgalleryImage([
            ...galleryImage,
            ...mappedData
        ])
    }

    const handleGalleryImageDelete = (id) => {
        const dummyData = [...galleryImage]
        const filteredData = dummyData.filter((e) => e.id != id)
        setgalleryImage(filteredData)
    }

    useEffect(() => {
        fetchCommisionValue()
    }, [])
    const fetchCoach = async () => {
        setloading(true)
        try {
            const res = await getAllCoaches();
            setallCoach(res?.data);
        } catch (err) {
            console.log(err)
        } finally {
            setloading(false)
        }
    }
    const fetchPrograms = async () => {
        setloading(true)
        try {
            const res = await getAllPrograms();
            setallProgramsCategory(res?.data?.data);
        } catch (err) {
            console.log(err)
        } finally {
            setloading(false)
        }
    }

    useEffect(() => {
        fetchCoach()
        fetchPrograms()
    }, []);
    const [tabs, setTabs] = useState({
        occurenceType: true,
        pricing: false,
        coaches: false,
        commission: false,
        tag: false,
    })
    const [toggle, settoggle] = useState({
        programFaq: true,
        programBenefit: false,
        programWorks: false,
    })

    const toggleFunction = (i) => {
        setIndex(i)
        if (index === i) {
            toggleFunction(0)
        } else {
            settoggle({
                programFaq: i === 1 ? true : false,
                programBenefit: i === 2 ? true : false,
                programWorks: i === 3 ? true : false,
            })
        }
    }
    const tabsFunction = (i) => {
        setTabs({
            occurenceType: i === 1 ? true : false,
            pricing: i === 2 ? true : false,
            coaches: i === 3 ? true : false,
            commission: i === 4 ? true : false,
            tag: i === 5 ? true : false
        })
    }

    const handleSubmit = async () => {

        try {
            setloading(true)
            const formData = new FormData()
            formData.append('name', staticdata.name)
            formData.append('program_category_id', programCategoryId)
            formData.append('description', programDescription || "")
            if (mainImage instanceof File) {
                formData.append('main_image', mainImage)
            }
            if (galleryImage?.length > 0) {
                galleryImage.forEach((element) => {
                    formData.append('gallery_images[]', element.img);
                });
            } else {
                formData.append('gallery_images', []);
            }

            if (faqImage instanceof File) {
                formData.append('faqs_section_image', faqImage)
            }

            if (dynamicFaq?.length > 0) {
                dynamicFaq.forEach((element, index) => {
                    formData.append(`faqs[${index}][heading]`, element.heading || "")
                    formData.append(`faqs[${index}][description]`, element.description || "")
                    formData.append(`faqs[${index}][sort_order]`, index)
                })
            }
            else {
                formData.append(`faqs`, '[]')
            }

            if (benefitImage instanceof File) {
                formData.append('benefits_section_image', benefitImage)
            }


            if (dynamicBenefits?.length > 0) {
                dynamicBenefits.forEach((element, index) => {
                    formData.append(`benefits[${index}][description]`, element.description)
                    formData.append(`benefits[${index}][sort_order]`, index)
                })
            } else {
                formData.append(`benefits`, '[]')
            }

            if (HowItWorksImage instanceof File) {
                formData.append('how_it_works_section_image', HowItWorksImage)
            }


            if (dynamicHowItWorks?.length > 0) {
                dynamicHowItWorks.forEach((element, index) => {
                    formData.append(`how_it_works[${index}][description]`, element.description)
                    formData.append(`how_it_works[${index}][sort_order]`, index)
                })
            } else {
                formData.append(`how_it_works`, '[]')
            }


            if (occurenceType == 'One Time') {
                if (staticdata.oneTimeSession) {
                    formData.append('session_duration_minutes', Number(staticdata.oneTimeSession))
                    formData.append('occurrence_type', 'one_time')
                }
            } else {
                formData.append('occurrence_type', 'recurring')
                formData.append('tenure_weeks', Number(staticdata.tenureWeeks) || "")
                formData.append('sessions_per_week', staticdata.noofSessions || "")
                formData.append('session_duration_minutes', Number(staticdata.recurringSession))
            }

            formData.append('sale_price', Number(staticdata.salePrice) || 0)
            formData.append('original_price', Number(staticdata.originalPrice) || 0)
            if (commissionTab == 'Global Commission') {
                formData.append('coach_commission_type', 'global')
            } else {
                formData.append('coach_commission_type', 'custom')
                formData.append('custom_commission_rate', staticdata.customcommisionRate || 0)
            }
            formData.append('tag', staticdata.tag || "")

            if (selectedPrograms?.length > 0) {
                selectedPrograms.forEach((element) => (
                    formData.append('coach_ids[]', element.value)
                ))
            } else {
                formData.append('coach_ids', '[]')
            }
            const res = await createProgram(formData);
            setprogramErrors(res)
        } catch (err) {
            console.log(err)
        } finally {
            setloading(false)
        }
    }

    console.log(programErrors
    )
    return (
        <>
            {loading && <Loaders />}
            <div className='dashboard_container'>
                <div className='coaches_head_wrapper'>
                    <div>
                        <h2>Create Program</h2>
                        <small><span onClick={(() => navigate('/dashboard/programs'))}>Program Creation</span> / <span onClick={(() => navigate('/dashboard/programs/create-program'))}>Create Program</span></small>
                    </div>
                    <div className='coaches_button_wapper'>

                        <div>
                            <Button children={'Cancel'} styles={{
                                fontSize: '13px',
                                color: 'var(--text-color)',
                                background: 'transparent',
                                border: 'none'
                            }} />
                        </div>
                        <div>
                            <Button onClick={handleSubmit} children={'Create'} styles={{
                                fontSize: '13px'
                            }} />
                        </div>
                    </div>
                </div>
                <form className='create_programs_content_wrapper'>
                    <div className='create_programs_left'>
                        <h4>Basic Details</h4>
                        <div className='create_program_form_wrapper'>
                            <div>
                                <Input onChange={handleChange} name={'name'} value={staticdata?.name} label={'Program Name'} required={true} placeholder={'Enter program name'} />
                                {programErrors?.name && <small style={{
                                    color:'red',
                                    fontSize:'12px',
                                    marginTop:'-10px'
                                }}>*{programErrors?.name[0]}</small>}
                            </div>
                            <div className='input_form'>
                                <label>Program Category <span>*</span></label>
                                <select onChange={((e) => setprogramCategoryId(e.target.value))}>
                                    <option value={''}>--select-program-category--</option>
                                    {allProgramsCategory?.length > 0 && allProgramsCategory?.map((e, i) => (
                                        <option value={e?.id} key={i}>{e?.name}</option>
                                    ))}
                                </select>

                                {programErrors?.program_category_id && <small style={{
                                    color: 'red',
                                    fontSize: '12px',
                                    marginTop: '-10px'
                                }}>*{programErrors?.program_category_id[0]}</small>}
                            </div>
                            {/* <div className='create_input_grid_wrapper'>
                                <div className='input_form'>
                                    <label>Program Category <span>*</span></label>
                                    <select>
                                        <option>Life Coaching</option>
                                    </select>
                                </div>

                                <div className='input_form'>
                                    <label>Program Sub-Category <span>*</span></label>
                                    <select>
                                        <option>Program Sub-Category 1</option>
                                    </select>
                                </div>
                            </div> */}
                            <div>
                                <CustomTextEditor defaultValue={programDescription} onChange={((data) => setprogramDescription(data))} label={'Description'} required={true} />

                                {programErrors?.description && <small style={{
                                    color: 'red',
                                    fontSize: '12px',
                                    marginTop: '-10px'
                                }}>*{programErrors?.description[0]}</small>}
                            </div>
                            <div className='input_form'>
                                <label style={{
                                    fontSize: '15px',
                                    fontWeight: '600'
                                }}>Main Image<span>*</span></label>

                                <div className='files_upload_wrapper'>
                                    {!mainImage && <>
                                        <img src={upload} />
                                        <p>Drag your files or <span>Browse</span></p>
                                        <h5>Png, Jpg, Jpeg supported | file size: 250 KB</h5>
                                    </>
                                    }

                                    {mainImage instanceof File && <img style={{
                                        width: '100%',
                                        height: '95%',
                                        objectFit: 'contain'
                                    }} src={URL.createObjectURL(mainImage)} alt="Preview" />}


                                    {typeof mainImage === "string" && (
                                        <img
                                            style={{
                                                width: "100%",
                                                height: "95%",
                                                objectFit: "contain"
                                            }}
                                            src={mainImage}
                                            alt="Preview"
                                        />
                                    )}
                                    <input onChange={((e) => setmainImage(e.target.files[0]))} type='file' />
                                </div>

                                {programErrors?.main_image && <small style={{
                                    color: 'red',
                                    fontSize: '12px',
                                    marginTop: '-10px'
                                }}>*{programErrors?.main_image[0]}</small>}
                            </div>

                            <div className='input_form'>
                                <label style={{
                                    fontSize: '15px',
                                    fontWeight: '600'
                                }}>Gallery Images</label>
                                <div className='files_upload_wrapper'>
                                    <img src={upload} />
                                    <p>Drag your files or <span>Browse</span></p>
                                    <h5>Png, Jpg, Jpeg supported | file size: 250 KB</h5>
                                    <input multiple onChange={handleGalleryImages} type='file' />
                                </div>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    gap: '10px',
                                    flexWrap: 'wrap',
                                    marginTop: '10px'
                                }}>
                                    {galleryImage?.length > 0 && galleryImage?.map((e, i) => (
                                        <div style={{
                                            width: '80px',
                                            height: '80px',
                                            borderRadius: '10px',
                                            position: 'relative'
                                        }}>
                                            <i onClick={(() => handleGalleryImageDelete(e?.id))} style={{
                                                position: 'absolute',
                                                top: '-10px',
                                                right: '-20px',
                                                cursor: 'pointer'
                                            }} class="fa-regular fa-circle-xmark"></i>
                                            {e.img instanceof File && <img style={{
                                                width: '100%',
                                                objectFit: 'cover',
                                                height: '100%',
                                                borderRadius: '10px'
                                            }} key={i} src={URL.createObjectURL(e.img)} />}

                                            {typeof e.img == 'string' && <img style={{
                                                width: '100%',
                                                objectFit: 'cover',
                                                height: '100%',
                                                borderRadius: '10px'
                                            }} key={i} src={e.img} />}
                                        </div>

                                    ))}
                                </div>
                                {programErrors?.gallery_images && <small style={{
                                    color: 'red',
                                    fontSize: '12px',
                                    marginTop: '-10px'
                                }}>*{programErrors?.gallery_images[0]}</small>}
                            </div>

                            <div className='other_details_wrapper'>
                                <label style={{
                                    fontSize: '15px',
                                    fontWeight: '600'
                                }}>Other Details</label>
                                <div className='other_details_content_Wrapper'>
                                    <div className='other_details_content_left'>
                                        <h4 onClick={(() => tabsFunction(1))} style={tabs.occurenceType ? {
                                            padding: '10px 10px',
                                            boxShadow: '0px 0px 4px #ccc',
                                            borderRadius: '5px',
                                            transition: '0.1s linear all'
                                        } : { transition: '0.1s linear all' }}>Occurrence type</h4>
                                        <h4 onClick={(() => tabsFunction(2))} style={tabs.pricing ? {
                                            padding: '10px 10px',
                                            boxShadow: '0px 0px 4px #ccc',
                                            borderRadius: '5px',
                                            transition: '0.1s linear all'
                                        } : { transition: '0.1s linear all' }}>Pricing</h4>
                                        <h4 onClick={(() => tabsFunction(3))} style={tabs.coaches ? {
                                            padding: '10px 10px',
                                            boxShadow: '0px 0px 4px #ccc',
                                            borderRadius: '5px',
                                            transition: '0.1s linear all'
                                        } : { transition: '0.1s linear all' }}>Coaches Selection</h4>
                                        <h4 onClick={(() => tabsFunction(4))} style={tabs.commission ? {
                                            padding: '10px 10px',
                                            boxShadow: '0px 0px 4px #ccc',
                                            borderRadius: '5px',
                                            transition: '0.1s linear all'
                                        } : { transition: '0.1s linear all' }}>Coach Commission</h4>
                                        <h4 onClick={(() => tabsFunction(5))} style={tabs.tag ? {
                                            padding: '10px 10px',
                                            boxShadow: '0px 0px 4px #ccc',
                                            borderRadius: '5px',
                                            transition: '0.1s linear all'
                                        } : { transition: '0.1s linear all' }}>Tag</h4>
                                    </div>
                                    <div className='other_details_content_right'>
                                        {/* Pricing Content */}



                                        {/* Occurence Type content */}

                                        <Activity mode={tabs.occurenceType ? 'visible' : 'hidden'}>
                                            <OccurenceType programErrors={programErrors} staticdata={staticdata} handleChange={handleChange} occurenceType={occurenceType} setoccurenceType={setoccurenceType} />
                                        </Activity>
                                        <Activity mode={tabs.pricing ? 'visible' : 'hidden'}>
                                            <PricingContent programErrors={programErrors} handleChange={handleChange} staticdata={staticdata} />
                                        </Activity>

                                        {/* Select Coaches Content */}
                                        <Activity mode={tabs.coaches ? 'visible' : 'hidden'}>
                                            <SelectCoaches selectedPrograms={selectedPrograms} setSelectedPrograms={setSelectedPrograms} allcoach={allcoach} />
                                        </Activity>


                                        {/* Coach Commission Content */}

                                        <Activity mode={tabs.commission ? 'visible' : 'hidden'}>
                                            <CoachCommission programErrors={programErrors} commissionTab={commissionTab} setcommissionTab={setcommissionTab} handleChange={handleChange} staticdata={staticdata} data={data} />
                                        </Activity>


                                        {/* Tag Content */}

                                        <Activity mode={tabs.tag ? 'visible' : 'hidden'}>
                                            <TagContent handleChange={handleChange} />
                                        </Activity>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='create_programs_right'>

                        <div className='faq_dropdown_main'>
                            <div className='faq_dropdown_wrapper'>
                                <h5>FaQs</h5>
                                <div style={toggle.programFaq ? { background: 'var(--primary-color)' } : {}} className='dropdown_button' onClick={(() => toggleFunction(1))}>
                                    <i class="fa-solid fa-angle-down" style={toggle.programFaq ? { color: '#fff', rotate: '90deg' } : {}}></i>
                                </div>
                            </div>
                            {toggle.programFaq && <ProgramsFaqContent faqImage={faqImage} setfaqImage={setfaqImage} dynamicFaq={dynamicFaq} setdynamicFaq={setdynamicFaq} />}
                        </div>


                        <div className='faq_dropdown_main'>
                            <div className='faq_dropdown_wrapper'>
                                <h5>Benefits</h5>
                                <div className='dropdown_button' style={toggle.programBenefit ? { background: 'var(--primary-color)' } : {}} onClick={(() => toggleFunction(2))}>
                                    <i class="fa-solid fa-angle-down" style={toggle.programBenefit ? { color: '#fff', rotate: '90deg' } : {}}></i>
                                </div>
                            </div>
                            {toggle.programBenefit && <CreateProgramsBenefits
                                benefitImage={benefitImage}
                                setbenefitImage={setbenefitImage}
                                setdynamicBenefits={setdynamicBenefits} dynamicBenefits={dynamicBenefits} />}
                        </div>



                        <div className='faq_dropdown_main'>
                            <div className='faq_dropdown_wrapper'>
                                <h5>How it works</h5>
                                <div className='dropdown_button' style={toggle.programWorks ? { background: 'var(--primary-color)' } : {}} onClick={(() => toggleFunction(3))}>
                                    <i class="fa-solid fa-angle-down" style={toggle.programWorks ? { color: '#fff', rotate: '90deg' } : {}}></i>
                                </div>
                            </div>
                            {toggle.programWorks && <CreateProgramsHowWorks setHowItWorksImage={setHowItWorksImage} HowItWorksImage={HowItWorksImage} dynamicHowItWorks={dynamicHowItWorks} setdynamicHowItWorks={setdynamicHowItWorks} />}
                        </div>

                    </div>
                </form>
            </div>
        </>
    )
}

export default CreatePrograms
