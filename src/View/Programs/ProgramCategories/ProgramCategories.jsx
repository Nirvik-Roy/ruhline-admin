import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Button from '../../../Components/Button.jsx';
import Pagination from '../../../Components/Pagination/Pagination.jsx';
import ellipse from '../../../assets/_MoreIcon_.svg'
import AddProgramCategoriesModal from '../../Modal/AddProgramCategoriesModal.jsx';

const ProgramCategories = () => {
    const [index, setIndex] = useState([]);
    const navigate = useNavigate();
    const [isModal, setisModal] = useState(false)
    const indexFunction = (i) => {
        if (index.includes(i)) {
            setIndex(prev => prev.filter((e) => e != i))
        } else {
            setIndex([...index, i])
        }
    }
    return (
        <>
            {isModal && <AddProgramCategoriesModal setisModal={setisModal} />}
            <div className='dashboard_container'>
                <div className='coaches_head_wrapper'>
                    <div>
                        <h2>Programs</h2>
                        <small>Programs / Program category</small>
                    </div>

                    <div className='coaches_button_wapper'>

                        <div onClick={(()=>setisModal(!isModal))}>
                            <Button children={'Add New Category'} styles={{
                                fontSize: '13px',
                                padding: '15px 15px',
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
                                <th>Program Category Name</th>
                                <th>No. of programs present</th>

                                <th style={{
                                    textAlign: 'center'
                                }}>Actions</th>

                            </tr>
                        </thead>
                        <tbody>
                            {[1, 2, 3, 4, 5, 6].map((e, i) => (
                                <tr>
                                    <td>
                                        -  Yoga Category 1
                                    </td>
                                    <td>12</td>
                                    <td>
                                        <img onClick={(() => indexFunction(i))} src={ellipse} />
                                        {index.includes(i) && <div className='actions_wrapper'>
                                            <p onClick={(() => {
                                                navigate(`/dashboard/coaches/single-coache/${i + 1}`)
                                            })}>View</p>
                                            <p onClick={(() => { seteditCoachModal(true) })}>Edit</p>
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

export default ProgramCategories
