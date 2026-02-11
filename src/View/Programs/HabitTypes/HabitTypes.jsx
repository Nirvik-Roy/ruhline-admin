import React, { useEffect, useRef, useState } from 'react'
import Button from '../../../Components/Button'
import laptopImg from '../../../assets/Group (2).svg'
import AddHabitTypeModal from '../../Modal/AddHabitTypeModal'
import { useNavigate } from 'react-router-dom'
import EdihabitTypeModal from '../../Modal/EdihabitTypeModal'
import { getAllHabitTypes, postHabitType } from '../../../utils/Program'
import Loaders from '../../../Components/Loaders/Loaders.jsx'
import { commonDelelteApi } from '../../../utils/common.js'
import DeleteModal from '../../../Components/DeleteModal/DeleteModal.jsx'
const HabitTypes = () => {
    const [dropdown, setdropdown] = useState(null);
    const [loading, setloading] = useState(false)
    const [isModal, setisModal] = useState(false);
    const [editModal, seteditModal] = useState(false);
    const [allHabitData, setallHabitData] = useState([]);
    const [habitId, sethabitId] = useState()
    const dropdownRef = useRef(null);
    const [deleteId, setdeleId] = useState();
    const [deleleteModal, setdeleteModal] = useState(false)
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
            const res = await getAllHabitTypes();
            setallHabitData(res?.data?.data)
        } catch (err) {
            console.log(err)
        } finally {
            setloading(false)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])


    const addHabitType = async (data) => {
        try {
            setloading(true);
            const res = await postHabitType(data);
            console.log(res);
            if (res?.success) {
                setisModal(false)
                fetchData()
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


    const deleteFunc = async () => {
        setloading(true)
        const res = await commonDelelteApi('/admin/habit-type', deleteId);
        if (res?.success) {
            setloading(false)
            setdeleteModal(false)
            fetchData();
            setdropdown(null)
        }
    }

    const handleDelete = (id) => {
        setdeleId(id)
        setdeleteModal(true)
    }
    return (
        <>
            {deleleteModal && <DeleteModal onClick={deleteFunc} details={'Do you want delete this habit?'} setdeleteModal={setdeleteModal} title={"Delete Habit"} />}
            {isModal && <AddHabitTypeModal addHabitType={addHabitType} setisModal={setisModal} />}
            {editModal && <EdihabitTypeModal fetchData={fetchData} habitId={habitId} seteditModal={seteditModal} />}
            {loading && <Loaders />}
            <div className='dashboard_container'>
                <div className='coaches_head_wrapper'>
                    <div>
                        <h2>Habit Types</h2>
                        <small><span onClick={(() => navigate('/dashboard/programs'))}>Programs</span> / <span onClick={(() => navigate('/dashboard/programs/habit-types'))}>Habit Types</span></small>
                    </div>

                    <div className='coaches_button_wapper'>

                        <div onClick={(() => setisModal(!isModal))}>
                            <Button children={'Add habit type'} styles={{
                                fontSize: '13px',
                                padding: '15px 15px',
                            }} />
                        </div>


                    </div>
                </div>


                <div className='coaches_shift_card_wrapper' style={{
                    gridTemplateColumns: 'repeat(auto-fill,minmax(170px,1fr)'
                }}>
                    {allHabitData?.length <= 0 && <p style={{
                        gridColumn: '1/-1',
                        textAlign: 'center'
                    }}>No Habit Types available...</p>}
                    {allHabitData?.length > 0 && allHabitData?.map((e, i) => (
                        <div ref={dropdownRef} key={e?.id} className='coaches_shift_card' style={{
                            padding: " 30px 0px",
                            background: 'rgba(144, 155, 109, 0.15)',
                            border: 'none'
                        }} onClick={(() => dropdownFunction(i))}>
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
                                    sethabitId(e?.id)
                                    seteditModal(true)
                                })}>Edit</small>
                                <small onClick={(() => handleDelete(e?.id))}>Delete</small>
                            </div>}
                        </div>

                    ))}
                </div>
            </div>
        </>
    )
}

export default HabitTypes
