import React, { Activity, useState } from 'react'
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
const CreatePrograms = () => {
    const navigate = useNavigate()
    const [index, setIndex] = useState(1)
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
    return (
        <>
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
                        <div onClick={(() => { navigate('/dashboard/programs/single-program/2') })}>
                            <Button children={'Create'} styles={{
                                fontSize: '13px'
                            }} />
                        </div>
                    </div>
                </div>
                <form className='create_programs_content_wrapper'>
                    <div className='create_programs_left'>
                        <h4>Basic Details</h4>
                        <div className='create_program_form_wrapper'>
                            <Input label={'Program Name'} required={true} defaultValue={'Yoga Program 1'} />
                            <div className='create_input_grid_wrapper'>
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
                            </div>
                            <Textarea label={'Description'} required={true} />
                            <div className='input_form'>
                                <label style={{
                                    fontSize: '15px',
                                    fontWeight: '600'
                                }}>Main Image<span>*</span></label>

                                <div className='files_upload_wrapper'>
                                    <img src={upload} />
                                    <p>Drag your files or <span>Browse</span></p>
                                    <h5>Png, Jpg, Jpeg supported | file size: 250 KB</h5>
                                    <input type='file' />
                                </div>
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
                                    <input type='file' />
                                </div>
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

                                        <Activity mode={tabs.pricing ? 'visible' : 'hidden'}>
                                            <PricingContent />
                                        </Activity>

                                        {/* Occurence Type content */}

                                        <Activity mode={tabs.occurenceType ? 'visible' : 'hidden'}>
                                            <OccurenceType />
                                        </Activity>


                                        {/* Select Coaches Content */}
                                        <Activity mode={tabs.coaches ? 'visible' : 'hidden'}>
                                            <SelectCoaches />
                                        </Activity>


                                        {/* Coach Commission Content */}

                                        <Activity mode={tabs.commission ? 'visible' : 'hidden'}>
                                            <CoachCommission />
                                        </Activity>


                                        {/* Tag Content */}

                                        <Activity mode={tabs.tag ? 'visible' : 'hidden'}>
                                            <TagContent />
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
                            {toggle.programFaq && <ProgramsFaqContent />}
                        </div>


                        <div className='faq_dropdown_main'>
                            <div className='faq_dropdown_wrapper'>
                                <h5>Benefits</h5>
                                <div className='dropdown_button' style={toggle.programBenefit ? { background: 'var(--primary-color)' } : {}} onClick={(() => toggleFunction(2))}>
                                    <i class="fa-solid fa-angle-down" style={toggle.programBenefit ? { color: '#fff', rotate: '90deg' } : {}}></i>
                                </div>
                            </div>
                            {toggle.programBenefit && <CreateProgramsBenefits />}
                        </div>



                        <div className='faq_dropdown_main'>
                            <div className='faq_dropdown_wrapper'>
                                <h5>How it works</h5>
                                <div className='dropdown_button' style={toggle.programWorks ? { background: 'var(--primary-color)' } : {}} onClick={(() => toggleFunction(3))}>
                                    <i class="fa-solid fa-angle-down" style={toggle.programWorks ? { color: '#fff', rotate: '90deg' } : {}}></i>
                                </div>
                            </div>
                            {toggle.programWorks && <CreateProgramsHowWorks />}
                        </div>

                    </div>
                </form>
            </div>
        </>
    )
}

export default CreatePrograms
