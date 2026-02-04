import React, { lazy, Suspense, useState } from 'react'
import Button from '../../../Components/Button'
import Input from '../../../Components/Input'
import CustomTextEditor from '../../../Components/CustomTextEditor/CustomTextEditor'
import upload from '../../../assets/Vector (8).svg'
import Addarticlesectionmodal from '../../Modal/Addarticlesectionmodal.jsx'
import { useNavigate } from 'react-router-dom'
const CmsAddArticles = () => {
    const [isModal, setisModal] = useState(false);
    const navigate = useNavigate();
    const [dynamicFormstructure, setdynamicformstructure] = useState([]);
    const [textAreaContent, settextareacontent] = useState()

    const deleteFunc = (id) => {
        const dummyData = [...dynamicFormstructure];
        const filteredData = dummyData.filter((e) => e.id != id);
        setdynamicformstructure(filteredData)
    }
    const handleChange = (id, e) => {
        const { name, value } = e.target;
        setdynamicformstructure(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, [name]: value } : item
            )
        );
    }
    const handleImage = (id, e) => {
        setdynamicformstructure(prevItems => (
            prevItems.map(item =>
                item.id === id ? { ...item, ['uploadImage']: e.target.files[0] } : item
            )
        ))
    }
    const ontextChange = (id, data) => {
        settextareacontent(data)
        setdynamicformstructure(prevItems => (
            prevItems.map(item => item.id === id ? { ...item, ['description']: data } : item)
        ))
    }

    console.log(dynamicFormstructure)
    return (
        <>

            {isModal && <Addarticlesectionmodal setdynamicformstructure={setdynamicformstructure} dynamicFormstructure={dynamicFormstructure} setisModal={setisModal} />}

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
                <form>
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
                    </div>
                    {dynamicFormstructure?.map((e, i) => (
                        <div key={e?.id} className='article_section_wrapper'>
                            <div className='article_section_head_wrapper'>
                                <h2>Section {i + 1}</h2>
                                <i onClick={(() => { deleteFunc(e?.id) })} class="fa-solid fa-xmark"></i>
                            </div>
                            <div className='add_articles_wrapper'>
                                <div className='articles_form_left'>
                                    {(e?.heading != null) && <div>
                                        <Input name={'heading'} onChange={((ele) => { handleChange(e?.id, ele) })} label={'Heading'} required={true} placeholder={'Enter blog heading..'} />
                                    </div>}

                                    {(e?.buttonName != null && (e?.buttonUrl != null)) && <div className='modal_input_grid_wrapper'>
                                        <div>
                                            <Input name={'buttonName'} onChange={((ele) => { handleChange(e?.id, ele) })} label={'Button Name'} required={true} placeholder={'Learn More'} />
                                        </div>
                                        <div>
                                            <Input name={'buttonUrl'} onChange={((ele) => { handleChange(e?.id, ele) })} label={'Button Url'} required={true} placeholder={'www.website.com'} />
                                        </div>

                                    </div>}

                                    {(e?.description != null) && <div>
                                        <CustomTextEditor onChange={((data) => ontextChange(e?.id, data))} label={'Description'} required={true} />

                                    </div>}

                                </div>
                                <div className='articles_form_left'>
                                    {(e?.uploadImage!= null) && <div className='input_form'>
                                        <div className='input_label_wrapper462'>
                                            <label style={{
                                                fontSize: '15px',
                                            }}>Upload Thumbnail Image<span>*</span></label>
                                            <div className='image_position_wrapper'>
                                                <p>Place image on</p>
                                                <select>
                                                    <option>Left Side</option>
                                                    <option>Right Side</option>

                                                </select>
                                            </div>

                                        </div>


                                        <div className='files_upload_wrapper'>
                                            {(e?.uploadImage == '') && <>
                                                <img src={upload} />
                                                <p>Drag your files or <span>Browse</span></p>
                                                <h5>Png, Jpg, Jpeg supported | file size: 250 KB</h5>
                                            </>}

                                            {(e?.uploadImage != '') && <>
                                                <img src={URL.createObjectURL(e?.uploadImage)} style={{
                                                    width: '100%',
                                                    objectFit: 'contain',
                                                    height: '95%'
                                                }} />
                                            </>}
                                            <input onChange={((ele) => { handleImage(e?.id, ele) })} type='file' />
                                        </div>
                                    </div>}
                                </div>
                            </div>
                        </div>
                    ))}


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
