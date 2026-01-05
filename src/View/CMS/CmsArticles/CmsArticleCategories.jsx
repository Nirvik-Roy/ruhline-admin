import React, { useState } from 'react'
import Pagination from '../../../Components/Pagination/Pagination.jsx'
import ellipse from '../../../assets/_MoreIcon_.svg'
import Button from '../../../Components/Button.jsx'
import AddArticleCategoriesModal from '../../Modal/AddArticleCategoriesModal.jsx'
import EditArticleModal from '../../Modal/EditArticleModal.jsx'
const CmsArticleCategories = () => {
    const [index, setIndex] = useState([]);
    const [addArticle, setaddArticle] = useState(false);
    const [editArticle,seteditArticle] = useState(false)
    const indexFunction = (i) => {
        if (index.includes(i)) {
            setIndex(prev => prev.filter((e) => e != i))
        } else {
            setIndex([...index, i])
        }
    }
    return (
        <>
            {addArticle && <AddArticleCategoriesModal setaddArticle={setaddArticle}/>}
            {editArticle && <EditArticleModal seteditArticle={seteditArticle}/>}
            <div className='dashboard_container'>
                <div className='coaches_head_wrapper'>
                    <div>
                        <h2>Article Categories</h2>
                        <small>CMS / Articles / Article Categories</small>
                    </div>

                    <div className='coaches_button_wapper'>
                        <div onClick={(()=>setaddArticle(true))}>
                            <Button children={'Add Article Category '} styles={{
                                fontSize: '13px',
                                padding:'15px 15px'
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
                                <th>Status </th>
                                <th style={{
                                    textAlign: 'center'
                                }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[1, 2, 3, 4, 5, 6].map((e, i) => (
                                <tr>
                                    <td>
                                        Article Category 1
                                    </td>
                                    <td>
                                        <p style={{
                                            padding: '5px',
                                            borderRadius: '5px',
                                            color: '#fff',
                                            fontSize: '11px',
                                            fontWeight: '600',
                                            background: 'rgba(231, 62, 69, 1)',
                                            width: 'fit-content'
                                        }}>Inactive</p>
                                    </td>
                                    <td>
                                        <img onClick={(() => indexFunction(i))} src={ellipse} />
                                        {index.includes(i) && <div className='actions_wrapper' style={{
                                            width: '50%',
                                            left: '20px'
                                        }}>
                                            <p>View</p>
                                            <p onClick={(() => { seteditArticle(true) })}>Edit</p>
                                            <p>Delete</p>
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
