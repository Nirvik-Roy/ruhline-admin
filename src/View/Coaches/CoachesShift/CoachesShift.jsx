import React, { useState } from 'react'
import './CoachesShift.css'
import Button from '../../../Components/Button'
import laptopImg from '../../../assets/Group (2).svg'
import NewShiftModal from '../../Modal/NewShiftModal'
import EditCoachShift from '../../Modal/EditCoachShift'
import WorkingDaysModal from '../../Modal/WorkingDaysModal'
const CoachesShift = () => {
    const [dropdown, setdropdown] = useState(null)
    const [shift, setshift] = useState({
        newShift: false,
        editShift: false,
        workingDays: false,
    })
    const shiftFunction = (i) => {
        setshift({
            newShift: i === 1 ? true : false,
            editShift: i === 2 ? true : false,
            workingDays: i === 3 ? true : false
        })
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
            {shift.newShift && <NewShiftModal shiftFunction={shiftFunction} />}
            {shift.editShift && <EditCoachShift shiftFunction={shiftFunction} />}
            {shift.workingDays && <WorkingDaysModal shiftFunction={shiftFunction} />}
            <div className='dashboard_container'>
                <div className='coaches_head_wrapper single_coach_head'>
                    <div>
                        <h1>Working Hours and Shifts</h1>
                        <small> Coaches / Working Hours and Shifts</small>
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
                    {['Early Morning', 'Morning', 'Afternoon', 'Evening', 'Night'].map((e, i) => (
                        <div key={e} className='coaches_shift_card' onClick={(() => dropdownFunction(i))}>
                            <img src={laptopImg} />
                            <i class="fa-solid fa-ellipsis-vertical"></i>
                            <p>{e}</p>

                            {dropdown == i && <div className='dropdown_wrapper662' onClick={((e) => e.stopPropagation())}>
                                <small onClick={(() => shiftFunction(2))}>Edit</small>
                                <small>Delete</small>
                            </div>}
                        </div>

                    ))}
                </div>
            </div>
        </>
    )
}

export default CoachesShift
