import React, { useState, useEffect } from 'react'
import Button from '../../Components/Button'
import { getWorkingDays, updateWorkingDays } from '../../utils/workingDays'

const WorkingDaysModal = ({ shiftFunction }) => {
    const [days, setDays] = useState([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        getWorkingDays().then((data) => {
            if (data?.days && Array.isArray(data.days)) {
                setDays(data.days.sort((a, b) => a.day_of_week - b.day_of_week))
            }
            setLoading(false)
        })
    }, [])

    const handleToggle = (dayOfWeek) => {
        setDays((prev) =>
            prev.map((d) =>
                d.day_of_week === dayOfWeek ? { ...d, is_working: !d.is_working } : d
            )
        )
    }

    const handleSave = async (e) => {
        e.preventDefault()
        const working_days = days.filter((d) => d.is_working).map((d) => d.day_of_week)
        setSaving(true)
        const updated = await updateWorkingDays({ working_days })
        setSaving(false)
        if (updated) {
            shiftFunction(0)
        }
    }

    return (
        <>
            <div className='modal_wrapper' onClick={() => shiftFunction(0)}></div>
            <div className='modal_div'>
                <h4>Working days</h4>
                <i className="fa-solid fa-xmark" onClick={() => shiftFunction(0)}></i>
                {loading ? (
                    <p style={{ margin: '20px 0' }}>Loading...</p>
                ) : (
                    <form className='modal_form' onSubmit={handleSave}>
                        <div className='modal_checbox_wrapper'>
                            {days.map((day) => (
                                <div key={day.id} className='modal_checbox'>
                                    <input
                                        type='checkbox'
                                        checked={day.is_working || false}
                                        onChange={() => handleToggle(day.day_of_week)}
                                    />
                                    <p>{day.day_name}</p>
                                </div>
                            ))}
                        </div>
                        <div className='change_cancel_wrapper'>
                            <Button children={saving ? 'Saving...' : 'Save'} onClick={handleSave} />
                        </div>
                    </form>
                )}
            </div>
        </>
    )
}

export default WorkingDaysModal
