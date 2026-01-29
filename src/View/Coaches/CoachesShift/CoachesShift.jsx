import React, { useState, useEffect } from 'react'
import './CoachesShift.css'
import Button from '../../../Components/Button'
import laptopImg from '../../../assets/Group (2).svg'
import NewShiftModal from '../../Modal/NewShiftModal'
import EditCoachShift from '../../Modal/EditCoachShift'
import WorkingDaysModal from '../../Modal/WorkingDaysModal'
import ConfirmDeleteModal from '../../Modal/ConfirmDeleteModal'
import { useNavigate } from 'react-router-dom'
import { getShifts, deleteShift } from '../../../utils/shift'

const CoachesShift = () => {
    const [dropdown, setdropdown] = useState(null);
    const navigate = useNavigate()
    const [shiftsData, setShiftsData] = useState([])
    const [loading, setLoading] = useState(true)
    const [editingShiftId, setEditingShiftId] = useState(null)
    const [deleteConfirm, setDeleteConfirm] = useState({ show: false, item: null })
    const [deletingConfirm, setDeletingConfirm] = useState(false)
    const [shift, setshift] = useState({
        newShift: false,
        editShift: false,
        workingDays: false,
    })

    const fetchShifts = async () => {
        setLoading(true)
        const data = await getShifts()
        if (data) {
            setShiftsData(data.data || [])
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchShifts()
    }, [])
    const shiftFunction = (i) => {
        if (i !== 2) setEditingShiftId(null)
        setshift({
            newShift: i === 1 ? true : false,
            editShift: i === 2 ? true : false,
            workingDays: i === 3 ? true : false
        })
    }
    const openEditModal = (item) => {
        setEditingShiftId(item.id)
        shiftFunction(2)
    }
    const openDeleteConfirm = (item) => {
        setdropdown(null)
        setDeleteConfirm({ show: true, item })
    }
    const handleConfirmDelete = async () => {
        if (!deleteConfirm.item) return
        setDeletingConfirm(true)
        const deleted = await deleteShift(deleteConfirm.item.id)
        setDeletingConfirm(false)
        if (deleted) {
            fetchShifts()
            setDeleteConfirm({ show: false, item: null })
        }
    }
    const dropdownFunction = (i) => {
        if (dropdown === i) {
            setdropdown(null)
        } else {
            setdropdown(i)
        }
    }
    return (
        <>
            {shift.newShift && <NewShiftModal shiftFunction={shiftFunction} onSuccess={fetchShifts} />}
            {shift.editShift && editingShiftId && (
                <EditCoachShift
                    shiftId={editingShiftId}
                    shiftFunction={shiftFunction}
                    onSuccess={fetchShifts}
                />
            )}
            {shift.workingDays && <WorkingDaysModal shiftFunction={shiftFunction} />}
            {deleteConfirm.show && (
                <ConfirmDeleteModal
                    open={deleteConfirm.show}
                    onClose={() => setDeleteConfirm({ show: false, item: null })}
                    onConfirm={handleConfirmDelete}
                    message="Are you sure you want to delete this shift?"
                    confirmLabel="Delete"
                    loading={deletingConfirm}
                />
            )}
            <div className='dashboard_container'>
                <div className='coaches_head_wrapper single_coach_head'>
                    <div>
                        <h1>Working Hours and Shifts</h1>
                        <small> <span onClick={(() => navigate('/dashboard/coaches'))}>Coaches</span> / <span onClick={(() => navigate('/dashboard/coaches/working-shift'))}>Working Hours and Shifts</span></small>
                    </div>

                    <div className='coaches_button_wapper'>
                        <div onClick={(() => shiftFunction(3))}>
                            <Button children={'Working days'} styles={{
                                color: 'var(--primary-color)',
                                border: '1px solid var(--primary-color)',
                                padding: '12px 15px',
                                background: 'transparent',
                                fontSize: '13px'
                            }} />
                        </div>

                        <div onClick={(() => shiftFunction(1))}>
                            <Button children={'Add new shift'} styles={{
                                fontSize: '13px'
                            }} />
                        </div>

                    </div>
                </div>

                <div className='coaches_shift_card_wrapper'>
                    {loading ? (
                        <p>Loading shifts...</p>
                    ) : shiftsData.length === 0 ? (
                        <p>No shifts found.</p>
                    ) : (
                        shiftsData.map((item, i) => (
                            <div key={item.id} className='coaches_shift_card' onClick={() => dropdownFunction(i)}>
                                <img src={laptopImg} alt="" />
                                <i className="fa-solid fa-ellipsis-vertical"></i>
                                <p>{item.name}</p>
                                <small>{item.start_time} - {item.end_time}</small>

                                {dropdown === i && (
                                    <div className='dropdown_wrapper662' onClick={(e) => e.stopPropagation()}>
                                        <small onClick={() => openEditModal(item)}>Edit</small>
                                        <small onClick={() => openDeleteConfirm(item)}>Delete</small>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    )
}

export default CoachesShift
