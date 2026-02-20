import React, { useEffect, useState, useRef } from 'react'
import './Coaches.css'
import Button from '../../Components/Button'
import img from '../../assets/a1380e7f99749ba01d9fdc18ec22e32c85fd5a0e.jpg'
import ellipse from '../../assets/_MoreIcon_.svg'
import Pagination from '../../Components/Pagination/Pagination'
import AddCoachModal from '../Modal/AddCoachModal'
import EditCoachModal from '../Modal/EditCoachModal'
import { useNavigate } from 'react-router-dom'
import { addNewCoach, deleteCoach, getAllCoaches, updateCoach, verifyCoach } from '../../utils/coach'
import Loaders from '../../Components/Loaders/Loaders'
import { getSingleCoach } from '../../utils/coach'
import DeleteModal from '../../Components/DeleteModal/DeleteModal'
import VerifyModal from '../../Components/VerifyModal/VerifyModal'
const Coaches = () => {
    const [index, setIndex] = useState([]);
    const [dropdown, setdropdown] = useState(null);
    const dropdownRef = useRef(null);
    const [deleteModal, setdeleteModal] = useState(false)
    const [coachData, setcoachData] = useState([]);
    const [deletedloading, setDeletedLoading] = useState(false)
    const [isLoading, setisLoading] = useState(false);
    const [deletedId, setdeletedId] = useState()
    const [coachId, setcoachId] = useState('')
    const [coachVerifyModal, setcoachVerifyModal] = useState(false)
    const [updateErrors, setupdateErrors] = useState()
    const [updateLoading, setUpdateLoading] = useState(false);
    const [addCoachError, setaddCoachError] = useState();
    const [singleCoachdata, setsingleCoachData] = useState({});
    const [singleCoachLoading, setsingleCoachLoading] = useState(false)
    const navigate = useNavigate()
    const indexFunction = (i) => {
        if (index.includes(i)) {
            setIndex(prev => prev.filter((e) => e != i))
        } else {
            setIndex([...index, i])
        }
    }
    const [coachModal, setCoachModal] = useState(false);
    const [ediCoachModal, seteditCoachModal] = useState(false);



    const getAllCoachesFunc = async () => {
        setisLoading(true)
        try {
            const res = await getAllCoaches()
            if (res) {
                setcoachData(res.data)
            }
        } catch (err) {
            console.log(err)
        } finally {
            setisLoading(false)
        }
    }


    const addNewCoachFunc = async (data, file) => {
        if (data) {
            setUpdateLoading(true)
            try {
                const result = await addNewCoach(data, file);
                setaddCoachError(result)
                await getAllCoachesFunc();
                console.log(result)
                if (result.success) {
                    setCoachModal(false)
                }
            } catch (err) {
                console.log(err)
            } finally {
                setUpdateLoading(false)
            }
        }
    }


    const deletedCoachfunc = async () => {
        setDeletedLoading(true)
        if (deletedId) {
            try {
                const result = await deleteCoach(deletedId);
                getAllCoachesFunc()
                console.log(result)
                if (result.success) {
                    setdeleteModal(false)
                }
            } catch (err) {
                console.log(err)
            } finally {
                setDeletedLoading(false)
            }
        }
    }

    const handleDelete = (id) => {
        setdeleteModal(true)
        setdeletedId(id)
    }

    useEffect(() => {
        getAllCoachesFunc()
    }, [])




    const getSingleCoachFunc = async (id) => {
        if (id) {
            setsingleCoachLoading(true)
            try {
                const result = await getSingleCoach(id);
                setsingleCoachData(result)
            } catch (err) {
                console.log(err)
            } finally {
                setsingleCoachLoading(false)
            }
        }
    }


    const editNewCoachfunc = async (id, data) => {
        if (data && id) {
            setUpdateLoading(true)
            try {
                const result = await updateCoach(id, data);
                setupdateErrors(result)
                await getAllCoachesFunc()
                if (result.success) {
                    seteditCoachModal(false)
                }
            } catch (err) {
                console.log(err)
            } finally {
                setUpdateLoading(false)
            }
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

    const handleCoach = (id) => {
        setcoachId(id)
        setcoachVerifyModal(true)
    }

    const handleCoachVerification = async () => {
        try {
            setisLoading(true)
            const res = await verifyCoach(coachId);
            console.log(res)
            if (res.success) {
                setcoachVerifyModal(false)
                getAllCoachesFunc()
            }
        } catch (err) {
            console.log(err)
        } finally {
            setisLoading(false)
        }
    }

    return (
        <>
            {coachVerifyModal && <VerifyModal setverifymodal={setcoachVerifyModal} onClick={handleCoachVerification} title={'Coach Verification'} details={'Do you want to verify this coach?'} />}
            {deleteModal && <DeleteModal setdeleteModal={setdeleteModal} onClick={deletedCoachfunc} title={'Delete Coach'} details={'Are you sure you want to delete this coach...'} />}
            {(updateLoading || deletedloading) && <Loaders />}

            {coachModal && <AddCoachModal addCoachError={addCoachError} addNewCoachFunc={addNewCoachFunc} setCoachModal={setCoachModal} />}
            {ediCoachModal && <EditCoachModal updateErrors={updateErrors} editNewCoachfunc={editNewCoachfunc} singleCoachdata={singleCoachdata} singleCoachLoading={singleCoachLoading} seteditCoachModal={seteditCoachModal} />}
            <div className='dashboard_container'>
                <div className='coaches_head_wrapper'>
                    <h2>Coaches</h2>
                    <div className='coaches_button_wapper'>
                        <div onClick={(() => navigate('/dashboard/coaches/working-shift'))}>
                            <Button children={'Working hours and shifts'} styles={{
                                color: 'var(--primary-color)',
                                border: '1px solid var(--primary-color)',
                                padding: '12px 15px',
                                background: 'transparent',
                                fontSize: '13px'
                            }} />
                        </div>

                        <div onClick={(() => setCoachModal(!coachModal))}>
                            <Button children={'Add a coach'} styles={{
                                fontSize: '13px'
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
                                <th>Coach Name</th>
                                <th>Coach Type</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(coachData.length <= 0 && !isLoading) && <td colSpan={12} style={{
                                textAlign: 'center',
                                fontWeight: '600',
                                color: '#ce7355',
                                fontSize: '15px'

                            }}>No data found!...</td>}
                            {coachData.length > 0 && coachData.map((e, i) => (
                                <tr>
                                    <td>
                                        <div className='customer_wrapper' style={{
                                            justifyContent: 'flex-start'
                                        }}>
                                            <div className='customer_img_div'>
                                                <img src={e?.profile?.profile_image ? e?.profile?.profile_image : img} />
                                            </div>
                                            <div className='customer_details_wrapper'>
                                                <p>{e?.user?.first_name} {e?.user?.last_name}</p>
                                                {/* <p>#ST456666</p> */}
                                            </div>
                                        </div>
                                    </td>
                                    <td>{e?.profile?.coach_type}</td>
                                    <td>{e?.user?.email}</td>
                                    <td>+{e?.profile?.phone_country_code.phone_code} {e?.profile?.phone}</td>
                                    <td>{e?.is_admin_verified ? <p style={{
                                        color: 'rgba(36, 159, 50, 1)'
                                    }}>Verified</p> : <p style={{
                                        color: 'red'
                                    }}>Not Verified</p>}</td>
                                    <td ref={dropdownRef}>
                                        <img onClick={((e) => {
                                            e.stopPropagation()
                                            indexFunction(i)
                                        })} src={ellipse} />
                                        {index.includes(i) && <div className='actions_wrapper' style={!e?.is_admin_verified ? {
                                            top: '50px',
                                            height: 'fit-content'
                                        } : {}}>
                                            {!e?.is_admin_verified && <p onClick={(() => handleCoach(e?.id))}>Verify Coach</p>}
                                            <p onClick={(() => {
                                                navigate(`/dashboard/coaches/single-coache/${e?.id}`)
                                            })}>View</p>
                                            <p onClick={(() => {
                                                getSingleCoachFunc(e?.id)
                                                seteditCoachModal(true)
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

export default Coaches
