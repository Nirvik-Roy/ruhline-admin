import React, { useEffect, useState } from 'react'
import Button from '../../Components/Button'
import Input from '../../Components/Input'
import { postArticleCategories } from '../../utils/cms';
import toast from 'react-hot-toast';
import Loaders from '../../Components/Loaders/Loaders';
const AddArticleCategoriesModal = ({ setaddArticle, addArticle, fetchArticleCmsData }) => {
    const [enable, setenable] = useState(false);
    const [loading, setloading] = useState(false);
    const [articleErrors, setarticleErrors] = useState([])
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

    const handleSubmit = async () => {
        if (categoryData.name != '') {
            try {
                setloading(true);
                const dummyData = { ...categoryData };
                dummyData.is_active = enable ? 'true' : 'false'
                const res = await postArticleCategories(dummyData);
                setarticleErrors(res)
                if (res.success) {
                    setaddArticle(false)
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
    useEffect(()=>{
        if (!addArticle){
            setarticleErrors([])
        }
    }, [addArticle])
    return (
        <>
            {loading && <Loaders />}
            <div className='modal_wrapper' onClick={(() => setaddArticle(false))}></div>
            <div className='modal_div'>
                <h4>Add Article Category</h4>
                <i class="fa-solid fa-xmark" onClick={(() => setaddArticle(false))}></i>
                <div style={{
                    margin: '25px 0'
                }}>
                    <Input onChange={handleChange} name={'name'} value={categoryData.name} label={'Article Category Name'} required={true} placeholder={'Article Category Name'} />

                    {articleErrors?.name && <small style={{
                        marginTop:'8px',
                        marginLeft:'15px',
                        color:'red'
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

                    <Button children={'Add'} styles={{
                        marginLeft: 'auto'
                    }} />
                </div>
            </div>
        </>
    )
}

export default AddArticleCategoriesModal
