import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Button from '../../Components/Button';
import Pagination from '../../Components/Pagination/Pagination';
import ellipse from '../../assets/_MoreIcon_.svg'
import { getPrograms } from '../../utils/Program';
import DeleteModal from '../../Components/DeleteModal/DeleteModal';
import Loaders from '../../Components/Loaders/Loaders.jsx'
import { commonDelelteApi } from '../../utils/common';
const Programs = () => {
    const [index, setIndex] = useState([]);
    const dropdownRef = useRef(null);

    const navigate = useNavigate()
    const [dropdown, setdropdown] = useState(false);
    const [loading, setloading] = useState();
    const [deleteId, setdeleteId] = useState('')
    const [deletedModal, setdeletedModal] = useState(false)
    const [programData, setprogramData] = useState([])
    const indexFunction = (i) => {
        if (index.includes(i)) {
            setIndex(prev => prev.filter((e) => e != i))
        } else {
            setIndex([...index, i])
        }
    }

    const fetchPrograms = async () => {
        try {
            setloading(true)
            const res = await getPrograms()
            setprogramData(res?.data?.data)
        } catch (err) {
            console.log(err)
        } finally {
            setloading(false)
        }
    }
    useEffect(() => {
        fetchPrograms()
    }, [])

    const handleDelete = (id) => {
        setdeleteId(id)
        setdeletedModal(true)
    }

    const deleteFunc = async () => {
        try {
            setloading(true)
            const res = await commonDelelteApi('/admin/project', deleteId);
            if (res.success) {
                setdeletedModal(false)
                fetchPrograms()
                setIndex([])
            }
        } catch (err) {
            console.log(err)
        } finally {
            setloading(false)
        }
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
            {loading
                && <Loaders />}
            {deletedModal && <DeleteModal setdeleteModal={setdeletedModal} onClick={deleteFunc} title={'Delete program'} details={'Do you really want to delete this program?'} />}
            <div className='dashboard_container'>
                <div className='coaches_head_wrapper'>
                    <h2>Programs</h2>
                    <div className='coaches_button_wapper'>
                        <div onClick={(() => navigate('/dashboard/programs/categories'))}>
                            <Button children={'Program category'} styles={{
                                color: 'var(--primary-color)',
                                border: '1px solid var(--primary-color)',
                                padding: '15px 15px',
                                background: 'transparent',
                                fontSize: '13px'
                            }} />
                        </div>

                        <div onClick={(() => navigate('/dashboard/programs/create-program'))}>
                            <Button children={'Add program'} styles={{
                                fontSize: '13px',
                                padding: '15px 15px',
                            }} />
                        </div>

                        <div className='coaches_search_wrapper'>
                            <input placeholder='Search' />
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </div>

                        <div onClick={(() => setdropdown(!dropdown))} style={{
                            border: '1px solid rgba(217, 217, 217, 1)',
                            borderRadius: '10px',
                            padding: '10px 12px',
                            position: 'relative'
                        }}>
                            <img src={ellipse} />
                            {dropdown && <div className='actions_wrapper' onClick={((e) => e.stopPropagation())} style={{
                                width: '170px',
                                left: '-130px',
                                rowGap: '0',
                                bottom: '-205px'
                            }}>
                                <p onClick={(() => navigate('/dashboard/programs/goal-types'))}>Goal Types</p>
                                <p onClick={(() => navigate('/dashboard/programs/habit-types'))}>Habit Types</p>
                                <p onClick={(() => navigate('/dashboard/programs/quote-categories'))}>Quotes Categories</p>
                                <p onClick={(() => navigate('/dashboard/programs/card/categories'))}>Cards Categories</p>
                                <p onClick={(() => navigate('/dashboard/programs/intermediate'))}>Intermediate Steps</p>
                            </div>}
                        </div>
                    </div>
                </div>

                <div className='table_container'>
                    <table className='total_table_order_wrapper coaches_table_wrapper'>
                        <thead>
                            <tr>
                                <th>Program Name</th>
                                <th>Program Category</th>
                                {/* <th>Program Sub-Category</th> */}
                                <th>Occurrence Type</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {programData?.length > 0 && programData?.map((e, i) => (
                                <tr>
                                    <td>
                                        <div className='customer_wrapper' style={{
                                            justifyContent: 'flex-start'
                                        }}>

                                            <div className='customer_details_wrapper'>
                                                <p>{e?.name}</p>
                                                <p>#{e?.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{e?.program_category?.name}</td>
                                    <td>{e?.occurrence_type}</td>
                                    <td>SAR{e?.sale_price}</td>
                                    <td ref={dropdownRef} onClick={((e)=>e.stopPropagation())}>
                                        <img onClick={(() => indexFunction(i))} src={ellipse} />
                                        {index.includes(i) && <div className='actions_wrapper'>
                                            <p onClick={(() => navigate(`/dashboard/programs/single-program/${e?.id}`))}>View</p>
                                            <p onClick={(() => navigate(`/dashboard/programs/edit-program/${e?.id}`))}>Edit</p>
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

export default Programs
