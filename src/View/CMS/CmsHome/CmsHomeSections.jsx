import React from 'react'
import Input from '../../../Components/Input.jsx'
import CustomTextEditor from '../../../Components/CustomTextEditor/CustomTextEditor.jsx'
import upload from '../../../assets/Vector (8).svg'
import Button from '../../../Components/Button.jsx'
const CmsHomeSections = () => {
    return (
        <>
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
                            <Input label={'Hero Headline'} required={true} defaultValue={'Find Your Inner Balance'} />
                            <CustomTextEditor label={'Hero Description'} required={true} defaultValue={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl lacinia nunc, a fermentum nunc nulla at quam. '} />
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
                                    <input type='file' />
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
                            <Input label={'Headline'} required={true} defaultValue={'About us'} />
                            <Input label={'Secondary Headline'} required={true} defaultValue={'Align your body. Center your mind.'} />
                            <CustomTextEditor label={'Description'} required={true} defaultValue={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl lacinia nunc, a fermentum nunc nulla at quam. '} />
                            <div className='section_form_grid_Wrapper'>
                                <Input label={'Button Name'} required={true} defaultValue={'Learn More'} />
                                <Input label={'Button Url'} required={true} defaultValue={'www.website.com'} />
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
                                    <input type='file' />
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
                        <Input label={' Headline'} required={true} defaultValue={'Programs'} />
                        <Input label={'Secondary Headline'} required={true} defaultValue={'Align your body. Center your mind.'} />
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
                        <Input label={' Headline'} required={true} defaultValue={'Programs'} />
                        <Input label={'Secondary Headline'} required={true} defaultValue={'Align your body. Center your mind.'} />
                        <div className='input_form'>
                            <label style={{
                                fontSize: '15px',
                            }}>Why choose us Section Image<span>*</span></label>
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
                            }}>Upload Background Image<span>*</span></label>
                            <div className='files_upload_wrapper'>
                                <img src={upload} />
                                <p>Drag your files or <span>Browse</span></p>
                                <h5>Png, Jpg, Jpeg supported | file size: 250 KB</h5>
                                <input type='file' />
                            </div>
                        </div>
                        <div className='option_title_wrapper'>
                            <div className='option'>
                                <h4>Option 1</h4>
                                <i class="fa-regular fa-trash-can"></i>
                            </div>
                            <div className='option_details_wrapper'>
                                <Input label={'Title'} required={true} defaultValue={'Lorem ipsum dolor'} />
                                <Input label={'Description'} required={true} defaultValue={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl lacinia nunc, a fermentum nunc nulla at quam. '} />
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
