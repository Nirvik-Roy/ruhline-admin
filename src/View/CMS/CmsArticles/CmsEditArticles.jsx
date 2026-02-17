import React, { useState, useEffect } from 'react'
import Button from '../../../Components/Button'
import Input from '../../../Components/Input'
import CustomTextEditor from '../../../Components/CustomTextEditor/CustomTextEditor'
import upload from '../../../assets/Vector (8).svg'
import Addarticlesectionmodal from '../../Modal/Addarticlesectionmodal.jsx'
import { useNavigate, useParams } from 'react-router-dom'
import { editAllCmsData, getAllCmsData, getAllSingleCmsData, } from '../../../utils/cms.js'
import Loaders from '../../../Components/Loaders/Loaders.jsx'
const CmsEditArticles = () => {
    const [isModal, setisModal] = useState(false);
    const navigate = useNavigate();
    const [dynamicFormstructure, setdynamicformstructure] = useState([]);
    const [articleCategories, setarticleCategories] = useState([]);
    const [singleArticle, setsingleArticle] = useState([])
    const [textAreaContent, settextareacontent] = useState();
    const [articlesErrors, setarticlesErrors] = useState()
    const [fixedDescriptionContent, setfixedDescriptionContent] = useState()
    const [facebookCheck, setfacebookCheck] = useState();
    const [twitterCheck, settwitterCheck] = useState();
    const [linkedinCheck, setlinkedinCheck] = useState();
    const [success, setsuccess] = useState()
    const [fixedThumnailImage, setfixedThumbnailImage] = useState()
    const [loading, setloading] = useState();
    const { id } = useParams()
    const [fixedData, setfixedData] = useState({
        article_category_id: '',
        name: '',
        description: '',
        share_facebook: 'false',
        share_twitter: 'false',
        share_linkedin: 'false'
    })

    const fixedDataChange = (e) => {
        const { name, value } = e.target;
        setfixedData({
            ...fixedData,
            [name]: value
        })
    }

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

    const fetchArticleCmsData = async () => {
        try {
            setloading(true);
            const res = await getAllCmsData('/admin/article/article-category');
            setarticleCategories(res?.data?.data)
        } catch (err) {
            console.log(err)
        } finally {
            setloading(false)
        }
    }

    useEffect(() => {
        fetchArticleCmsData()
    }, [])

    const fetchSingleCmsData = async () => {
        if (id) {
            try {
                setloading(true)
                const res = await getAllSingleCmsData('/admin/article/article', id);
                setsingleArticle(res?.data)
                setsuccess(true)
            } catch (err) {
                console.log(err)
            } finally {
                setloading(false)
            }
        }
    }

    useEffect(() => {
        fetchSingleCmsData()
    }, [])

    useEffect(() => {
        if (success) {
            setfixedData({
                article_category_id: singleArticle?.article_category?.id || '',
                name: singleArticle?.name || '',
                description: singleArticle?.description || '',
                share_facebook: singleArticle?.share_facebook && 'true' || 'false',
                share_twitter: singleArticle?.share_twitter && 'true' || 'false',
                share_linkedin: singleArticle?.share_linkedin && 'true' || 'false',
            })

            const mappedSections = singleArticle?.sections?.length > 0 && singleArticle?.sections?.map((section, index) => ({
                id: section.id || Date.now() + index,
                heading: section?.heading || null,
                uploadImage: section?.image || null,
                image_position: section?.image_position || '',
                description: section?.description || null,
                buttonName: section?.button || null,
                buttonUrl: section?.button_url || null
            }))
            setfacebookCheck(singleArticle?.share_facebook && true || false)
            settwitterCheck(singleArticle?.share_twitter && true || false)
            setlinkedinCheck(singleArticle?.share_linkedin && true || false)
            setdynamicformstructure(mappedSections)
            setfixedDescriptionContent(singleArticle?.description || '');
        }


    }, [success])

    console.log(singleArticle)
    const handleSubmit = async () => {
        try {
            setloading(true);
            const dummyData = { ...fixedData };
            dummyData.share_facebook = facebookCheck ? 'true' : 'false',
                dummyData.share_twitter = twitterCheck ? 'true' : 'false',
                dummyData.share_linkedin = linkedinCheck ? 'true' : 'false',
                setfixedData(dummyData)
            const formData = new FormData();
            { fixedData.article_category_id && formData.append('article_category_id', fixedData.article_category_id); }
            { fixedData.name && formData.append('name', fixedData.name); }
            { fixedDescriptionContent && formData.append('description', fixedDescriptionContent) }
            formData.append('share_facebook', fixedData.share_facebook)
            formData.append('share_twitter', fixedData.share_twitter)
            formData.append('share_linkedin', fixedData.share_linkedin)
            { fixedThumnailImage && formData.append('thumbnail_image', fixedThumnailImage) }
            if (dynamicFormstructure?.length > 0) {
                console.log('Array is not empty')
                dynamicFormstructure?.forEach((element, index) => {
                    if (element?.heading) {
                        formData.append(`sections[${index}][heading]`, element.heading);
                    }
                    if (element?.description) {
                        formData.append(`sections[${index}][description]`, element.description);
                    }
                    if (element?.image_position) {
                        formData.append(`sections[${index}][image_position]`, element.image_position);
                    }
                    if (element?.buttonName) {
                        formData.append(`sections[${index}][button]`, element.buttonName,)
                    }
                    if (element?.buttonUrl) {
                        formData.append(`sections[${index}][button_url]`, element.buttonUrl)
                    }

                    if (element?.uploadImage instanceof File) {
                        formData.append(`sections[${index}][image]`, element.uploadImage)
                    }
                    formData.append(`sections[${index}][sort_order]`, index)
                });
            }else{
                console.log('Array is empty')
            }
            const res = await editAllCmsData('/admin/article/article', formData, id);
            setarticlesErrors(res)
        } catch (err) {
            console.log(err)
        } finally {
            setloading(false);
            console.log(dynamicFormstructure)
        }
    }

    console.log(dynamicFormstructure)
    return (
        <>
            {loading && <Loaders />}
            {isModal && <Addarticlesectionmodal setdynamicformstructure={setdynamicformstructure} dynamicFormstructure={dynamicFormstructure} setisModal={setisModal} />}

            <div className='dashboard_container'>
                <div className='coaches_head_wrapper'>
                    <div>
                        <h2> Articles / Edit Article</h2>
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

                        <div onClick={(() => handleSubmit())}>
                            <Button children={'Update'} styles={{
                                fontSize: '13px'
                            }} />
                        </div>
                    </div>
                </div>
                <form>
                    <div className='add_articles_wrapper'>
                        <div className='articles_form_left'>
                            <div>
                                <Input name={'name'} value={fixedData.name} onChange={fixedDataChange} label={'Article Name'} required={true} placeholder={'Enter article name'} />

                                {articlesErrors?.name && <small style={{
                                    color: 'red',
                                    marginLeft: '15px',
                                    marginTop: '10px'
                                }}>{articlesErrors?.name && articlesErrors?.name[0]}</small>}
                            </div>

                            <div className='input_form'>
                                <label> Article Category <span>*</span></label>
                                <select name={'article_category_id'} value={fixedData.article_category_id} onChange={fixedDataChange}>
                                    <option>--select-article-category--</option>
                                    {articleCategories.length > 0 && articleCategories?.map((e) => (
                                        <option key={e?.id} value={e?.id}>{e?.name}</option>
                                    ))}
                                </select>
                                {articlesErrors?.article_category_id && <small style={{
                                    color: 'red',
                                    marginLeft: '15px',
                                    marginTop: '10px'
                                }}>{articlesErrors?.article_category_id && articlesErrors?.article_category_id[0]}</small>}
                            </div>
                            <div>
                                <CustomTextEditor defaultValue={fixedDescriptionContent} onChange={((data) => setfixedDescriptionContent(data))} label={'Description'} required={true} />

                                {articlesErrors?.description && <small style={{
                                    color: 'red',
                                    marginLeft: '15px',
                                    marginTop: '10px'
                                }}>{articlesErrors?.description && articlesErrors?.description[0]}</small>}
                            </div>

                        </div>
                        <div className='articles_form_left'>
                            <div className='input_form'>
                                <label style={{
                                    fontSize: '15px',
                                }}>Upload Thumbnail Image<span>*</span></label>

                                <div className='files_upload_wrapper'>
                                    {!fixedThumnailImage && !singleArticle?.thumbnail_image && <>
                                        <img src={upload} />
                                        <p>Drag your files or <span>Browse</span></p>
                                        <h5>Png, Jpg, Jpeg supported | file size: 250 KB</h5>
                                    </>
                                    }
                                    {fixedThumnailImage && <img style={{
                                        width: '100%',
                                        height: '95%',
                                        objectFit: 'contain'
                                    }} src={URL.createObjectURL(fixedThumnailImage)} />}
                                    {singleArticle?.thumbnail_image && !fixedThumnailImage && <img style={{
                                        width: '100%',
                                        height: '95%',
                                        objectFit: 'contain'
                                    }} src={singleArticle?.thumbnail_image} />}

                                    <input onChange={((e) => setfixedThumbnailImage(e.target.files[0]))} type='file' />
                                </div>

                                {articlesErrors?.thumbnail_image && <small style={{
                                    color: 'red',
                                    marginLeft: '15px',
                                    marginTop: '10px'
                                }}>{articlesErrors?.thumbnail_image && articlesErrors?.thumbnail_image[0]}</small>}
                            </div>

                            <div className='share_post_wrapper'>
                                <p>Share the post option</p>
                                <div className='share_checkbox_Wrapper'>
                                    <input checked={facebookCheck} onChange={(() => {
                                        setfacebookCheck(!facebookCheck)
                                    })} type='checkbox' />
                                    <span>Facebook</span>
                                </div>

                                <div className='share_checkbox_Wrapper'>
                                    <input checked={twitterCheck} onChange={(() => settwitterCheck(!twitterCheck))} type='checkbox' />
                                    <span>Twitter</span>
                                </div>

                                <div className='share_checkbox_Wrapper'>
                                    <input checked={linkedinCheck} onChange={(() => setlinkedinCheck(!linkedinCheck))} type='checkbox' />
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
                                        <Input value={dynamicFormstructure[i]?.heading} name={'heading'} onChange={((ele) => { handleChange(e?.id, ele) })} label={'Heading'} required={true} placeholder={'Enter blog heading..'} />
                                    </div>}

                                    {(e?.buttonName != null && (e?.buttonUrl != null)) && <div className='modal_input_grid_wrapper'>
                                        <div>
                                            <Input value={dynamicFormstructure[i]?.buttonName} name={'buttonName'} onChange={((ele) => { handleChange(e?.id, ele) })} label={'Button Name'} required={true} placeholder={'Learn More'} />
                                        </div>
                                        <div>
                                            <Input value={dynamicFormstructure[i]?.buttonUrl} name={'buttonUrl'} onChange={((ele) => { handleChange(e?.id, ele) })} label={'Button Url'} required={true} placeholder={'www.website.com'} />
                                        </div>

                                    </div>}

                                    {(e?.description != null) && <div>
                                        <CustomTextEditor defaultValue={dynamicFormstructure[i]?.description} onChange={((data) => ontextChange(e?.id, data))} label={'Description'} required={true} />
                                    </div>}

                                </div>
                                <div className='articles_form_left'>
                                    {(e?.uploadImage != null) && <div className='input_form'>
                                        <div className='input_label_wrapper462'>
                                            <label style={{
                                                fontSize: '15px',
                                            }}>Upload Thumbnail Image<span>*</span></label>
                                            <div className='image_position_wrapper'>
                                                <p>Place image on</p>
                                                <select value={dynamicFormstructure[i]?.image_position} name='image_position' onChange={((ele) => handleChange(e?.id, ele))}>
                                                    <option >--slect-image-position--</option>
                                                    <option value={'left'}>Left Side</option>
                                                    <option value={'right'}>Right Side</option>
                                                    <option value={'center'}>Center</option>
                                                </select>
                                            </div>

                                        </div>


                                        <div className='files_upload_wrapper'>
                                            {(e?.uploadImage == '') && <>
                                                <img src={upload} />
                                                <p>Drag your files or <span>Browse</span></p>
                                                <h5>Png, Jpg, Jpeg supported | file size: 250 KB</h5>
                                            </>}
                                            {(e?.uploadImage instanceof File) && (
                                                <img
                                                    src={URL.createObjectURL(e.uploadImage)}
                                                    style={{
                                                        width: '100%',
                                                        objectFit: 'contain',
                                                        height: '95%'
                                                    }}
                                                />
                                            )}


                                            {typeof e?.uploadImage === 'string' && <img src={e?.uploadImage} style={{
                                                width: '100%',
                                                objectFit: 'contain',
                                                height: '95%'
                                            }} />}

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

export default CmsEditArticles
