import React, { useState, useEffect } from 'react'
import Button from '../../Components/Button'
import Input from '../../Components/Input.jsx'
import ConfirmDeleteModal from './ConfirmDeleteModal'
import { getShiftById, updateShift, deleteShift } from '../../utils/shift'

const EditCoachShift = ({ shiftId, shiftFunction, onSuccess }) => {
    const [enable, setenable] = useState(true)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
    const [form, setForm] = useState({
        name: '',
        start_time: '',
        end_time: '',
    })

    useEffect(() => {
        if (shiftId) {
            setLoading(true)
            getShiftById(shiftId).then((data) => {
                if (data) {
                    setForm({
                        name: data.name || '',
                        start_time: data.start_time || '',
                        end_time: data.end_time || '',
                    })
                }
                setLoading(false)
            })
        }
    }, [shiftId])

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!shiftId) return
        setSaving(true)
        const payload = {
            name: form.name,
            start_time: form.start_time,
            end_time: form.end_time,
        }
        const updated = await updateShift(shiftId, payload)
        setSaving(false)
        if (updated) {
            onSuccess?.()
            shiftFunction(0)
        }
    }

    const handleDelete = async () => {
        if (!shiftId) return
        setDeleting(true)
        const deleted = await deleteShift(shiftId)
        setDeleting(false)
        if (deleted) {
            setShowDeleteConfirm(false)
            onSuccess?.()
            shiftFunction(0)
        }
    }

    return (
        <>
            {showDeleteConfirm && (
                <ConfirmDeleteModal
                    open={showDeleteConfirm}
                    onClose={() => setShowDeleteConfirm(false)}
                    onConfirm={handleDelete}
                    message="Are you sure you want to delete this shift?"
                    confirmLabel="Delete"
                    loading={deleting}
                />
            )}
            <div className='modal_wrapper' onClick={() => shiftFunction(0)}></div>
            <div className='modal_div'>
                <h4>Edit shift</h4>
                <i className="fa-solid fa-xmark" onClick={() => shiftFunction(0)}></i>
                {loading ? (
                    <p>Loading shift...</p>
                ) : (
                    <form className='modal_form' onSubmit={handleSubmit}>
                        <Input
                            label={'Shift Name'}
                            required={true}
                            placeholder={'Early Morning'}
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                        />
                        <div className='modal_input_grid_wrapper'>
                            <Input
                                label={'Start Time'}
                                required={true}
                                type={'time'}
                                name="start_time"
                                value={form.start_time}
                                onChange={handleChange}
                            />
                            <Input
                                label={'End Time'}
                                required={true}
                                type={'time'}
                                name="end_time"
                                value={form.end_time}
                                onChange={handleChange}
                            />
                        </div>

                        <div className='enbale_wrapper'>
                            <p>Enable</p>
                            <div onClick={() => setenable(!enable)} className={enable ? 'enable_toggle_wrapper' : 'enable_toggle_wrapper2'} style={enable ? { background: 'var(--primary-color)' } : { background: '#293e5f' }}>
                                {enable ? <i className="fa-solid fa-check"></i> : <i className="fa-solid fa-xmark"></i>}
                                <div className='toggle_circle' ></div>
                            </div>
                        </div>
                        <div className='change_cancel_wrapper'>
                            <button type="button" onClick={() => setShowDeleteConfirm(true)}>Delete</button>
                            <Button children={saving ? 'Saving...' : 'Save'} onClick={handleSubmit} />
                        </div>
                    </form>
                )}
            </div>
        </>
    )
}

export default EditCoachShift
