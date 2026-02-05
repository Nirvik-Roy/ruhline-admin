import React, { useEffect, useState, useRef } from 'react'
import Pagination from '../../../Components/Pagination/Pagination.jsx'
import ellipse from '../../../assets/_MoreIcon_.svg'
import Button from '../../../Components/Button.jsx'
import AddArticleCategoriesModal from '../../Modal/AddArticleCategoriesModal.jsx'
import EditArticleModal from '../../Modal/EditArticleModal.jsx'
import { useNavigate } from 'react-router-dom'
import { deleteCmsData, getAllCmsData } from '../../../utils/cms.js'
import Loaders from '../../../Components/Loaders/Loaders.jsx'
import DeleteModal from '../../../Components/DeleteModal/DeleteModal.jsx'
const CmsArticleCategories = () => {
    const [index, setIndex] = useState([]);
    const navigate = useNavigate()
    const dropdownRef = useRef(null);
    const [addArticle, setaddArticle] = useState(false);
    const [articleId, setarticleId] = useState()
    const [editArticle, seteditArticle] = useState(false);
    const [loading, setloading] = useState(false)
    const [allArticles, setallArticles] = useState([]);
    const [deleteModal, setdeleteModal] = useState(false);
    const [deleteId, setdeleteId] = useState()
    const indexFunction = (i) => {
        if (index.includes(i)) {
            setIndex(prev => prev.filter((e) => e != i))
        } else {
            setIndex([...index, i])
        }
    }

    const fetchArticleCmsData = async () => {
        try {
            setloading(true);
            const res = await getAllCmsData('/admin/article/article-category');
            setallArticles(res?.data?.data)
        } catch (err) {
            console.log(err)
        } finally {
            setloading(false)
        }
    }

    useEffect(() => {
        fetchArticleCmsData()
    }, [])

    const deleteFunc = async () => {
        if (deleteId) {
            setloading(true);
            const res = await deleteCmsData('/admin/article/article-category', deleteId);
            if (res.success) {
                setloading(false);
                setdeleteModal(false);
                fetchArticleCmsData()
            } else {
                setloading(false)
            }
        }
    }

    const handleDelete = (id) => {
        setdeleteModal(true);
        setdeleteId(id)
    }

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIndex([]);
        }
    };


    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);
    return (
        <>
            {loading && <Loaders />}
            {deleteModal && <DeleteModal setdeleteModal={setdeleteModal} title={'Delete article categories'} details={'Do you really want to delete this category?'} onClick={deleteFunc} />}
            {addArticle && <AddArticleCategoriesModal fetchArticleCmsData={fetchArticleCmsData} addArticle={addArticle} setaddArticle={setaddArticle} />}
            {editArticle && <EditArticleModal articleId={articleId} editArticle={editArticle} fetchArticleCmsData={fetchArticleCmsData} seteditArticle={seteditArticle} />}
            <div className='dashboard_container'>
                <div className='coaches_head_wrapper'>
                    <div>
                        <h2>Article Categories</h2>
                        <small> <span onClick={(() => navigate('/dashboard/cms'))}>CMS</span> / <span onClick={(() => navigate('/dashboard/cms/articles'))}>Articles</span> / <span onClick={(() => navigate('/dashboard/cms/article-categories'))}>Article Categories</span></small>
                    </div>

                    <div className='coaches_button_wapper'>
                        <div onClick={(() => setaddArticle(true))}>
                            <Button children={'Add Article Category '} styles={{
                                fontSize: '13px',
                                padding: '15px 15px'
                            }} />
                        </div>

                        <div className='coaches_search_wrapper'>
                            <input placeholder='Search' />
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </div>
                    </div>
                </div>

                <div className='table_container'>
                    <table className='total_table_order_wrapper coaches_table_wrapper'>
                        <thead>
                            <tr>
                                <th>Article Category Name</th>
                                <th>Articles Count</th>
                                <th>Status </th>
                                <th style={{
                                    textAlign: 'center'
                                }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {addArticle?.length <= 0 && <td colSpan={12}>No article categories data found!.</td>}
                            {allArticles?.length > 0 && allArticles?.map((e, i) => (
                                <tr>
                                    <td>
                                        {e?.name}
                                    </td>
                                    <td></td>
                                    <td>
                                        {!e?.is_active && <p style={{
                                            padding: '5px',
                                            borderRadius: '5px',
                                            color: '#fff',
                                            fontSize: '11px',
                                            fontWeight: '600',
                                            background: 'rgba(231, 62, 69, 1)',
                                            width: 'fit-content'
                                        }}>Inactive</p>}
                                        {e?.is_active && <p style={{
                                            padding: '5px',
                                            borderRadius: '5px',
                                            color: '#fff',
                                            fontSize: '11px',
                                            fontWeight: '600',
                                            background: 'rgb(10, 128, 13)',
                                            width: 'fit-content'
                                        }}>Active</p>}
                                    </td>
                                    <td ref={dropdownRef} style={{
                                        position: 'relative'
                                    }}>
                                        <img onClick={((e) => {
                                            e.stopPropagation()
                                            indexFunction(i)
                                        })} src={ellipse} />
                                        {index.includes(i) && <div className='actions_wrapper' style={{
                                            width: '50%',
                                            left: '20px',
                                            top: '30px',
                                            height: 'fit-content'
                                        }}>
                                            <p onClick={(() => {
                                                seteditArticle(true)
                                                setarticleId(e?.id)
                                            })}>Edit</p>
                                            <p onClick={(() => handleDelete(e?.id))}>Delete</p>
                                        </div>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <Pagination />
            </div>
        </>
    )
}

export default CmsArticleCategories
