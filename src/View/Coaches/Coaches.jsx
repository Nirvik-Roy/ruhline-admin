import React, { useEffect, useState } from 'react'
import './Coaches.css'
import Button from '../../Components/Button'
import img from '../../assets/a1380e7f99749ba01d9fdc18ec22e32c85fd5a0e.jpg'
import ellipse from '../../assets/_MoreIcon_.svg'
import Pagination from '../../Components/Pagination/Pagination'
import AddCoachModal from '../Modal/AddCoachModal'
import EditCoachModal from '../Modal/EditCoachModal'
import { useNavigate } from 'react-router-dom'
import { addNewCoach, deleteCoach, getAllCoaches } from '../../utils/coach'
import Loaders from '../../Components/Loaders/Loaders'
const Coaches = () => {
    const [index, setIndex] = useState([]);
    const [coachData, setcoachData] = useState([]);
    const [deleted, setdeleted] = useState(false)
    const [isLoading, setisLoading] = useState(false);
    const [updateLoading, setUpdateLoading] = useState(false);
    const [addCoachError, setaddCoachError] = useState()
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


    const addNewCoachFunc = async (data) => {
        if (data) {
            setUpdateLoading(true)
            try {
                const result = await addNewCoach(data);
                setaddCoachError(result)
                await getAllCoachesFunc()
            } catch (err) {
                console.log(err)
            } finally {
                setUpdateLoading(false)
            }
        }
    }


    const deletedCoachfunc = async (id) => {
        if (id) {
            try {
                await deleteCoach(id);
                getAllCoachesFunc()
                setdeleted(true)
            } catch (err) {
                console.log(err)
            }
        }
    }

    useEffect(() => {
        getAllCoachesFunc()
    }, [deleted])

    return (
        <>
            {updateLoading && <Loaders />}
            {coachModal && <AddCoachModal addCoachError={addCoachError} addNewCoachFunc={addNewCoachFunc} setCoachModal={setCoachModal} />}
            {ediCoachModal && <EditCoachModal seteditCoachModal={seteditCoachModal} />}
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
                                            {/* <div className='customer_img_div'>
                                                <img src={img} />
                                            </div> */}
                                            <div className='customer_details_wrapper'>
                                                <p>{e?.user?.first_name} {e?.user?.last_name}</p>
                                                {/* <p>#ST456666</p> */}
                                            </div>
                                        </div>
                                    </td>
                                    <td>{e?.profile?.coach_type}</td>
                                    <td>{e?.user?.email}</td>
                                    <td>+{e?.profile?.phone_country_code.phone_code} {e?.profile?.phone}</td>
                                    <td>
                                        <img onClick={(() => indexFunction(i))} src={ellipse} />
                                        {index.includes(i) && <div className='actions_wrapper'>
                                            <p onClick={(() => {
                                                navigate(`/dashboard/coaches/single-coache/${i + 1}`)
                                            })}>View</p>
                                            <p onClick={(() => { seteditCoachModal(true) })}>Edit</p>
                                            <p onClick={(() => deletedCoachfunc(e?.id))}>Delete</p>
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
