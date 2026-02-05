import React, { useState, useEffect } from 'react'
import Button from '../../Components/Button'
import Input from '../../Components/Input'
import { editArticleCategories, getAllSingleCmsData } from '../../utils/cms';
import toast from 'react-hot-toast';
import Loaders from '../../Components/Loaders/Loaders';
const EditArticleModal = ({ seteditArticle, editArticle, fetchArticleCmsData, articleId }) => {
    const [enable, setenable] = useState(false);
    const [loading, setloading] = useState(false);
    const [singleCategory, setsingleCategory] = useState()
    const [articleErrors, setarticleErrors] = useState([]);
    const [success,setSuccess] = useState(false)
    const [categoryData, setcategoryData] = useState({
        name: '',
        is_active: 'false'
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setcategoryData({
            ...categoryData,
            [name]: value
        })
    }

    const fetchSingleArticle = async () => {
        if (articleId) {
            try {
                setloading(true)
                const res = await getAllSingleCmsData('/admin/article/article-category', articleId);
                setsingleCategory(res?.data)
                setSuccess(true)
            } catch (err) {
                console.log(err)
            } finally {
                setloading(false)
            }
        }
    }

    useEffect(() => {
        fetchSingleArticle()
    }, [articleId])

    useEffect(() => {
        if (success) {
            setcategoryData({
                name: singleCategory?.name || '',
                is_active: singleCategory?.is_active ? 'true' : 'false',
            })
            setenable(singleCategory?.is_active ? true : false)
        }
    }, [success])

    console.log(categoryData)


    const handleSubmit = async () => {
        if (categoryData.name != '') {
            try {
                setloading(true);
                const dummyData = { ...categoryData };
                dummyData.is_active = enable ? 'true' : 'false'
                const res = await editArticleCategories(dummyData,articleId);
                setarticleErrors(res)
                if (res.success) {
                    seteditArticle(false)
                    fetchArticleCmsData()
                }
            } catch (err) {
                console.log(err)
            } finally {
                setloading(false)
            }
        } else {
            toast.error('Plz enter the field...')
        }
    }
    useEffect(() => {
        if (!editArticle) {
            setarticleErrors([])
        }
    }, [editArticle])
    return (
        <>
            {loading && <Loaders />}
            <div className='modal_wrapper' onClick={(() => seteditArticle(false))}></div>
            <div className='modal_div'>
                <h4>Edit Article Category</h4>
                <i class="fa-solid fa-xmark" onClick={(() => seteditArticle(false))}></i>
                <div style={{
                    margin: '25px 0'
                }}>
                    <Input onChange={handleChange} name={'name'} value={categoryData.name} label={'Article Category Name'} required={true} placeholder={'Article Category Name'} />

                    {articleErrors?.name && <small style={{
                        marginTop: '8px',
                        marginLeft: '15px',
                        color: 'red'
                    }}>*{articleErrors?.name && articleErrors?.name[0]}</small>}
                </div>

                <div className='enbale_wrapper'>
                    <p>Active</p>
                    <div onClick={(() => { setenable(!enable) })} className={enable ? 'enable_toggle_wrapper' : 'enable_toggle_wrapper2'} style={enable ? { background: 'var(--primary-color)' } : { background: '#293e5f' }}>
                        {enable ? <i class="fa-solid fa-check"></i> : <i class="fa-solid fa-xmark"></i>}
                        <div className='toggle_circle' ></div>
                    </div>
                </div>
                <div onClick={(() => handleSubmit())}>

                    <Button children={'Edit'} styles={{
                        marginLeft: 'auto'
                    }} />
                </div>
            </div>
        </>
    )
}

export default EditArticleModal
