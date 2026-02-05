import React, { useEffect, useState } from 'react'
import Button from '../../../Components/Button'
import img from '../../../assets/image (2).png'
import editsvg from '../../../assets/Frame 237764.svg'
import deleteSvg from '../../../assets/Group 80927.svg'
import './CmsArticles.css'
import { useNavigate } from 'react-router-dom'
import TimeAgo from 'react-timeago';
import { deleteCmsData, getAllCmsData } from '../../../utils/cms'
import Loaders from '../../../Components/Loaders/Loaders'
import DeleteModal from '../../../Components/DeleteModal/DeleteModal.jsx'
const CmsArticles = () => {
    const navigate = useNavigate();
    const [loading, setloading] = useState(false);
    const [deleteId,setdeleteId] = useState()
    const [deleteModal,setdeleModal] = useState(false)
    const [articleData,setarticleData] = useState([])
    const getdata = async () => {
        try {
            setloading(true)
            const res = await getAllCmsData('/admin/article/article');
            setarticleData(res?.data?.data)
            console.log(res?.data?.data)
        } catch (err) {
            console.log(err);
        } finally {
            setloading(false)
        }
    }

    useEffect(() => {
        getdata()
    }, [])

    const handleDelete = (id)=>{
        setdeleModal(true);
        setdeleteId(id)
    }

    const deleteFunc = async ()=>{
        try{
           setloading(true);
            const res = await deleteCmsData('/admin/article/article', deleteId)
            if(res?.success){
                setdeleModal(false)
                getdata()
            }
        }catch(err){
            console.log(err)
        }finally{
            setloading(false)
        }
    }
    return (
        <>
            {loading && <Loaders/>}
            {deleteModal && <DeleteModal onClick={deleteFunc} title={'Delete Article'} details={'Do you really want to delete this article?'} setdeleteModal={setdeleModal} />}
            <div className='dashboard_container'>
                <div className='coaches_head_wrapper'>
                    <div>
                        <h2>Articles</h2>
                        <small> <span onClick={(() => navigate('/dashboard/cms'))}>CMS</span> / <span onClick={(() => navigate('/dashboard/cms/articles'))}>Articles</span></small>
                    </div>

                    <div className='coaches_button_wapper'>
                        <div onClick={(() => navigate('/dashboard/cms/article-categories'))} >
                            <Button children={'Article Categories'} styles={{
                                color: 'var(--primary-color)',
                                border: '1px solid var(--primary-color)',
                                padding: '12px 15px',
                                background: 'transparent',
                                fontSize: '13px'
                            }} />
                        </div>

                        <div onClick={(() => navigate('/dashboard/cms/add-articles'))}>
                            <Button children={'Add Article'} styles={{
                                fontSize: '13px'
                            }} />
                        </div>
                    </div>
                </div>
                {articleData.length <= 0 && <p style={{
                    textAlign: 'center'
                }}>No articles found!...</p>}
                <div className='cms_articles_grid_wrapper'>
               
                    {articleData?.map((e,i)=>(
                        <div key={i} className='cms_card_articles'>
                            <div className='cms_card_img'>
                                <img className='edit_cms_card_img' onClick={(()=>navigate(`/dashboard/cms/edit-articles/${e?.id}`))} src={editsvg} />
                                <img className='delete_cms_card_img' onClick={(()=>{
                                    handleDelete(e?.id)
                                    console.log(e?.id)
                                })} src={deleteSvg} />
                                <img className='cms_img456' src={e?.thumbnail_image} />
                            </div>

                            <div className='cms_articles_para'>
                                <div className='cms_articles_title'>
                                    <p>{e?.article_category?.name}</p>
                                    <small><TimeAgo date={e?.updated_at}/></small>
                                </div>
                                <div className='cms_articles_para'>
                                    <h3>{e?.name}</h3>
                                    <p>{e?.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                

                </div>
            </div>
        </>
    )
}

export default CmsArticles
