import React, { useEffect, useRef, useState } from 'react'
import Button from '../../../Components/Button'
import laptopImg from '../../../assets/Group (2).svg'
import AddGoalTypesModal from '../../Modal/AddGoalTypesModal'
import { useNavigate } from 'react-router-dom'
import EditGoalTypesModal from '../../Modal/EditGoalTypesModal'
import { getAllGoalTypes, postGoalType } from '../../../utils/Program'
import Loaders from '../../../Components/Loaders/Loaders.jsx'
import DeleteModal from '../../../Components/DeleteModal/DeleteModal.jsx'
import { commonDelelteApi } from '../../../utils/common.js'
const GoalTypes = () => {
    const [dropdown, setdropdown] = useState(null)
    const [isModal, setisModal] = useState(false);
    const [loading, setloading] = useState(false)
    const [editModal, seteditModal] = useState(false);
    const [allGoalData, setallGoalData] = useState([]);
    const [goalId, setgoalId] = useState();
    const [deleteId, setdeleId] = useState();
    const [deleleteModal, setdeleteModal] = useState(false)
    const dropdownRef = useRef(null);
    const navigate = useNavigate()
    const dropdownFunction = (i) => {
        if (dropdown === i) {
            setdropdown(null)
        } else {
            setdropdown(i)
        }
    }
    const fetchData = async () => {
        try {
            setloading(true)
            const res = await getAllGoalTypes();
            setallGoalData(res?.data?.data)
        } catch (err) {
            console.log(err)
        } finally {
            setloading(false)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])


    const addGoal = async (data) => {
        try {
            setloading(true);
            const res = await postGoalType(data);
            if (res?.success) {
                fetchData()
                setisModal(false);
            }
        } catch (err) {
            console.log(err)
        } finally {
            setloading(false)
        }
    }

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setdropdown(null);
        }
    };
    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const handleDelete = (id) => {
        setdeleId(id)
        setdeleteModal(true)
    }

    const deleteFunc = async () => {
        try {
            setloading(true)
            const res = await commonDelelteApi("/admin/goal-type",deleteId)
            if(res?.success){
                setdeleteModal(false)
                setdeleId('')
                fetchData()
                setdropdown(null)
            }
        } catch (err) {
            console.log(err)
        } finally {
            setloading(false)
        }
    }
    return (
        <>
            {isModal && <AddGoalTypesModal addGoal={addGoal} setisModal={setisModal} />}
            {editModal && <EditGoalTypesModal fetchData={fetchData} goalId={goalId} seteditModal={seteditModal} />}
            {deleleteModal && <DeleteModal onClick={deleteFunc} title={"Delete Goal Type"} details={'Do you really want to delete this goal type?'} />}
            {loading && <Loaders />}
            <div className='dashboard_container'>
                <div className='coaches_head_wrapper'>
                    <div>
                        <h2>Goal Types</h2>
                        <small><span onClick={(() => navigate('/dashboard/programs'))}>Programs</span> / <span onClick={(() => navigate('/dashboard/programs/goal-types'))}>Goal Types</span></small>
                    </div>

                    <div className='coaches_button_wapper'>

                        <div onClick={(() => setisModal(!isModal))}>
                            <Button children={'Add goal type'} styles={{
                                fontSize: '13px',
                                padding: '15px 15px',
                            }} />
                        </div>


                    </div>
                </div>


                <div className='coaches_shift_card_wrapper' style={{
                    gridTemplateColumns: 'repeat(auto-fill,minmax(170px,1fr)'
                }}>
                    {allGoalData?.length <= 0 && <p style={{
                        gridColumn: '1/-1',
                        textAlign: 'center'
                    }}>No Goal Types available...</p>}
                    {allGoalData?.length > 0 && allGoalData?.map((e, i) => (
                        <div ref={dropdownRef} key={e?.id} className='coaches_shift_card' style={{
                            padding: " 30px 0px",
                            background: 'rgba(144, 155, 109, 0.15)',
                            border: 'none'
                        }} onClick={((e) => {
                            e.stopPropagation()
                            dropdownFunction(i)
                        })}>
                            <img style={{
                                width: '55px'
                            }} src={laptopImg} />
                            <i class="fa-solid fa-ellipsis-vertical"></i>
                            <p>{e?.name}</p>

                            {dropdown == i && <div className='dropdown_wrapper662' style={{
                                bottom: '0',
                                top: '30px',
                                right: '-30px',
                                height: 'fit-content'
                            }} onClick={((e) => e.stopPropagation())}>
                                <small onClick={(() => {
                                    setgoalId(e?.id);
                                    seteditModal(true)
                                })}>Edit</small>
                                <small onClick={(()=>handleDelete(e?.id))}>Delete</small>
                            </div>}
                        </div>

                    ))}
                </div>
            </div>
        </>
    )
}

export default GoalTypes
