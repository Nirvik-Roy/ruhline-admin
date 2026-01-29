import React, { useState } from 'react'
import Button from '../../Components/Button'
import Input from '../../Components/Input.jsx'
import { createShift } from '../../utils/shift'

const NewShiftModal = ({ shiftFunction, onSuccess }) => {
    const [saving, setSaving] = useState(false)
    const [form, setForm] = useState({
        name: '',
        start_time: '',
        end_time: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSaving(true)
        const payload = {
            name: form.name,
            start_time: form.start_time,
            end_time: form.end_time,
        }
        const created = await createShift(payload)
        setSaving(false)
        if (created) {
            onSuccess?.()
            shiftFunction(0)
        }
    }

    return (
        <>
            <div className='modal_wrapper' onClick={() => shiftFunction(0)}></div>
            <div className='modal_div'>
                <h4>Add new shift</h4>
                <i className="fa-solid fa-xmark" onClick={() => shiftFunction(0)}></i>
                <form className='modal_form' onSubmit={handleSubmit}>
                    <Input
                        label={'Shift Name'}
                        required={true}
                        placeholder={'Enter your Shift Name'}
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
                    <div className='change_cancel_wrapper'>
                        <Button children={saving ? 'Adding...' : 'Add'} onClick={handleSubmit} />
                    </div>
                </form>
            </div>
        </>
    )
}

export default NewShiftModal
