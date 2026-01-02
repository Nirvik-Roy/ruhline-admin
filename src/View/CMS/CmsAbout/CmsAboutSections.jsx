import React from 'react'
import Input from '../../../Components/Input'
import CustomTextEditor from '../../../Components/CustomTextEditor/CustomTextEditor'
import upload from '../../../assets/Vector (8).svg'
import Button from '../../../Components/Button'
import './CmsAbout.css'
const CmsAboutSections = () => {
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
                            <Input label={' Headline'} required={true} defaultValue={'About us'} />
                            <Input label={'Secondary Headline'} required={true} defaultValue={'Align your body. Center your mind.'} />
                            <CustomTextEditor label={'Description'} required={true} defaultValue={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl lacinia nunc, a fermentum nunc nulla at quam. '} />
                        </div>
                        <div className='section_1_details'>
                            <div className='input_form'>
                                <label style={{
                                    fontSize: '15px',
                                }}>About Us Section Image<span>*</span></label>
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
                    <h3>Section 2 (Mision Vision Values)</h3>
                    <div className='brown_arrow_box'>
                        <i class="fa-solid fa-angle-down"></i>
                    </div>
                </div>

                <div className='about_mission_options_wrapper'>
                    <div className='option_title_wrapper'>
                        <div className='option'>
                            <h4>Option 1</h4>
                            <i class="fa-regular fa-trash-can"></i>
                        </div>
                        <div className='option_details_wrapper'>
                            <Input label={'Title'} required={true} defaultValue={'Mission'} />
                            <Input label={'Description'} required={true} defaultValue={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl lacinia nunc, a fermentum nunc nulla at quam. '} />
                            <div className='input_form'>
                                <label style={{
                                    fontSize: '15px',
                                }}>Upload Icon<span>*</span></label>
                                <div className='files_upload_wrapper'>
                                    <img src={upload} />
                                    <p>Drag your files or <span>Browse</span></p>
                                    <h5>Png, Jpg, Jpeg supported | file size: 250 KB</h5>
                                    <input type='file' />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='option_title_wrapper'>
                        <div className='option'>
                            <h4>Option 1</h4>
                            <i class="fa-regular fa-trash-can"></i>
                        </div>
                        <div className='option_details_wrapper'>
                            <Input label={'Title'} required={true} defaultValue={'Vission'} />
                            <Input label={'Description'} required={true} defaultValue={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl lacinia nunc, a fermentum nunc nulla at quam. '} />
                            <div className='input_form'>
                                <label style={{
                                    fontSize: '15px',
                                }}>Upload Icon<span>*</span></label>
                                <div className='files_upload_wrapper'>
                                    <img src={upload} />
                                    <p>Drag your files or <span>Browse</span></p>
                                    <h5>Png, Jpg, Jpeg supported | file size: 250 KB</h5>
                                    <input type='file' />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='option_title_wrapper'>
                        <div className='option'>
                            <h4>Option 1</h4>
                            <i class="fa-regular fa-trash-can"></i>
                        </div>
                        <div className='option_details_wrapper'>
                            <Input label={'Title'} required={true} defaultValue={'Value'} />
                            <Input label={'Description'} required={true} defaultValue={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl lacinia nunc, a fermentum nunc nulla at quam. '} />
                            <div className='input_form'>
                                <label style={{
                                    fontSize: '15px',
                                }}>Upload Icon<span>*</span></label>
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
                    <h3>Section 3 (Our Founder)</h3>
                    <div className='brown_arrow_box'>
                        <i class="fa-solid fa-angle-down"></i>
                    </div>
                </div>

                <div className='section_dropdown_content_wrapper'>
                    <div className='section_1_content_wrapper'>
                        <div className='section_1_details'>
                            <div className='section_form_grid_Wrapper'>
                                <Input label={' Headline'} required={true} defaultValue={'Meet our Founder'} />
                                <Input label={'Secondary Headline'} required={true} defaultValue={'Sama Jas'} />
                            </div>
                            <CustomTextEditor label={'Description'} required={true} defaultValue={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl lacinia nunc, a fermentum nunc nulla at quam. '} />
                        </div>
                        <div className='section_1_details'>
                            <div className='input_form'>
                                <label style={{
                                    fontSize: '15px',
                                }}>Upload Image<span>*</span></label>
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
            </div>

        </>
    )
}

export default CmsAboutSections
