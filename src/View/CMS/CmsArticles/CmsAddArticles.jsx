import React, {  useState } from 'react'
import Button from '../../../Components/Button'
import Input from '../../../Components/Input'
import CustomTextEditor from '../../../Components/CustomTextEditor/CustomTextEditor'
import upload from '../../../assets/Vector (8).svg'
import Addarticlesectionmodal from '../../Modal/Addarticlesectionmodal.jsx'
import { useNavigate } from 'react-router-dom'
const CmsAddArticles = () => {
    const [isModal, setisModal] = useState(false);
    const navigate = useNavigate();
    const formStructure = [
        {
            id:1,
            name:true,
            blogCategory:true,
            description:true,
            uploadImage:true,
            shareOption:true,
        },
    ]
    return (
        <>

            {isModal && <Addarticlesectionmodal setisModal={setisModal} />}

            <div className='dashboard_container'>
                <div className='coaches_head_wrapper'>
                    <div>
                        <h2>Add Articles / Add Article</h2>
                        <small> <span onClick={(() => navigate('/dashboard/cms'))}>CMS</span> / <span onClick={(() => navigate('/dashboard/cms/articles'))}>Articles</span></small>
                    </div>
                    <div className='coaches_button_wapper'>
                        <div>
                            <Button children={'Cancel'} styles={{
                                color: 'var(--text-color)',
                                border: 'none',
                                padding: '12px 15px',
                                background: 'transparent',
                                fontSize: '13px'
                            }} />
                        </div>

                        <div >
                            <Button children={'Add'} styles={{
                                fontSize: '13px'
                            }} />
                        </div>
                    </div>
                </div>
                <form onSubmit={((e)=>e.preventDefault())}>
                    <div className='add_articles_wrapper'>
                        <div className='articles_form_left'>
                            <Input label={'Blog Name'} required={true} placeholder={'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'} />

                            <div className='input_form'>
                                <label>Select Blog Category <span>*</span></label>
                                <select>
                                    <option>Blog Category 1</option>
                                </select>
                            </div>

                            <CustomTextEditor label={'Description'} required={true} />
                            <div className='share_post_wrapper'>
                                <p>Share the post option</p>
                                <div className='share_checkbox_Wrapper'>
                                    <input type='checkbox' />
                                    <span>Facebook</span>
                                </div>

                                <div className='share_checkbox_Wrapper'>
                                    <input type='checkbox' />
                                    <span>Twitter</span>
                                </div>

                                <div className='share_checkbox_Wrapper'>
                                    <input type='checkbox' />
                                    <span>LinkedIn</span>
                                </div>
                            </div>
                        </div>
                        <div className='articles_form_left'>
                            <div className='input_form'>
                                <label style={{
                                    fontSize: '15px',
                                }}>Upload Thumbnail Image<span>*</span></label>

                                <div className='files_upload_wrapper'>
                                    <img src={upload} />
                                    <p>Drag your files or <span>Browse</span></p>
                                    <h5>Png, Jpg, Jpeg supported | file size: 250 KB</h5>
                                    <input type='file' />
                                </div>
                            </div>

                           
                        </div>
                    </div>


                    <div className='article_section_wrapper'>
                        <div className='article_section_head_wrapper'>
                            <h2>Section 1</h2>
                            <i class="fa-solid fa-xmark"></i>
                        </div>
                        <div className='add_articles_wrapper'>
                            <div className='articles_form_left'>
                                <Input label={'Blog Name'} required={true} placeholder={'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'} />

                                <div className='input_form'>
                                    <label>Select Blog Category <span>*</span></label>
                                    <select>
                                        <option>Blog Category 1</option>
                                    </select>
                                </div>

                                <CustomTextEditor label={'Description'} required={true} />

                            </div>
                            <div className='articles_form_left'>
                                <div className='input_form'>
                                    <div className='input_label_wrapper462'>
                                        <label style={{
                                            fontSize: '15px',
                                        }}>Upload Thumbnail Image<span>*</span></label>
                                        <div className='image_position_wrapper'>
                                            <p>Place image on</p>
                                            <select>
                                                <option>Right Side</option>
                                                <option>Left Side</option>
                                            </select>
                                        </div>

                                    </div>


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



                   



                    {/* <div className='section_divider'></div> */}
                    <div onClick={(() => setisModal(!isModal))}>

                    <Button children={'Add Section'} styles={{
                        color: 'var(--text-color)',
                        border: '1px solid var(--primary-color)',
                        padding: '12px 15px',
                        background: 'transparent',
                        fontSize: '13px',
                        marginTop: '30px'
                    }} />
                    </div>

                </form>

            </div>
        </>
    )
}

export default CmsAddArticles
