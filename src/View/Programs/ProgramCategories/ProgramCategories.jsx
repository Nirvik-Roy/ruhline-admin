import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import Button from '../../../Components/Button.jsx';
import Pagination from '../../../Components/Pagination/Pagination.jsx';
import ellipse from '../../../assets/_MoreIcon_.svg'
import AddProgramCategoriesModal from '../../Modal/AddProgramCategoriesModal.jsx';
import { deleteCategories, getAllPrograms } from '../../../utils/Program.js';
import Loaders from '../../../Components/Loaders/Loaders.jsx';
import EditProgramCategoriesModal from '../../Modal/EditProgramCategoriesModal.jsx';
import DeleteModal from '../../../Components/DeleteModal/DeleteModal.jsx';

const ProgramCategories = () => {
    const [index, setIndex] = useState([]);
    const [allPrograms, setallPrograms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editModal, setEditModal] = useState(false)
    const navigate = useNavigate();
    const [editIndex, setEditIndex] = useState('')
    const dropdownRef = useRef(null);
    const [isModal, setisModal] = useState(false)
    const [deletedId, setdeletedId] = useState()
    const [deleteModal, setdeleteModal] = useState(false)
    const indexFunction = (i) => {
        if (index.includes(i)) {
            setIndex(prev => prev.filter((e) => e != i))
        } else {
            setIndex([...index, i])
        }
    }
    const fetchPrograms = async () => {
        setLoading(true)
        try {
            const res = await getAllPrograms();
            setallPrograms(res.data?.data);
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchPrograms()
    }, []);


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

    const handleDelete = (id) => {
        setdeleteModal(true)
        setdeletedId(id)
    }

    const deleteFunc = async () => {
        try {
            setLoading(true)
            const res = await deleteCategories(deletedId);
            if (res.success) {
                setdeleteModal(false)
                fetchPrograms()
            }
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            {loading && <Loaders />}
            {deleteModal && <DeleteModal title={'Delete program categories'} details={"Do you really want to delete this category?"} onClick={deleteFunc} setdeleteModal={setdeleteModal} />}
            {editModal && <EditProgramCategoriesModal editModal={editModal} allPrograms={allPrograms} editIndex={editIndex} fetchPrograms={fetchPrograms} setEditModal={setEditModal} />}
            {isModal && <AddProgramCategoriesModal fetchPrograms={fetchPrograms} setisModal={setisModal} />}
            <div className='dashboard_container'>
                <div className='coaches_head_wrapper'>
                    <div>
                        <h2>Programs</h2>
                        <small> <span onClick={(() => navigate('/dashboard/programs'))}>Programs</span> / <span onClick={(() => navigate('/dashboard/programs/categories'))}>Program category</span></small>
                    </div>

                    <div className='coaches_button_wapper'>

                        <div onClick={(() => setisModal(!isModal))}>
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
                            {allPrograms?.length < 0 && <td colSpan={12} style={{
                                textAlign: 'center'
                            }}>No program categories available...</td>}
                            {allPrograms?.length > 0 && allPrograms?.map((e, i) => (
                                <>
                                    {e?.parent_id == null ? <>
                                        <tr className='parent_row'>
                                            <td>
                                                {e?.name}
                                            </td>
                                            <td>12</td>
                                            <td>
                                                <img onClick={(() => indexFunction(i))} src={ellipse} />
                                                {index.includes(i) && <div className='actions_wrapper' style={{
                                                    width: '70%'
                                                }}>
                                                    <p>View</p>
                                                    <p onClick={(() => e?.id)}>Edit</p>
                                                    <p>Delete</p>
                                                </div>}
                                            </td>
                                        </tr>
                                    </> : <tr className='child_row'>
                                        <td>
                                            -{e?.name}
                                        </td>
                                        <td>12</td>
                                        <td style={{
                                            position:'relative'
                                        }} ref={dropdownRef}>
                                            <img onClick={((e) => {
                                                e.stopPropagation()
                                                indexFunction(i)
                                            })} src={ellipse} />
                                            {index.includes(i) && <div className='actions_wrapper' style={{
                                                width: '50%',
                                                bottom:'-80px',
                                                left:'0'
                                            }}>
                                                {/* <p>View</p> */}
                                                <p onClick={(() => {
                                                    setEditIndex(e?.id);
                                                    setEditModal(true)
                                                })}>Edit</p>
                                                <p onClick={(() => {
                                                    handleDelete(e?.id)
                                                })}>Delete</p>
                                            </div>}
                                        </td>
                                    </tr>}
                                </>
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
