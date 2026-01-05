import React, { useState } from 'react'
import Button from '../../Components/Button'
import Input from '../../Components/Input.jsx'
const EditCoachShift = ({ shiftFunction }) => {
    const [enable, setenable] = useState(true)
    return (
        <>
            <div className='modal_wrapper' onClick={(() => shiftFunction(0))}></div>
            <div className='modal_div'>
                <h4>Add new shift</h4>
                <i class="fa-solid fa-xmark" onClick={(() => shiftFunction(0))}></i>
                <form className='modal_form'>
                    <Input label={'Shift Name'} required={true} placeholder={'Early Morning'} />
                    <div className='modal_input_grid_wrapper'>
                        <Input label={'Start Time'} required={true} type={'time'} />
                        <Input label={'End Time'} required={true} type={'time'} />
                    </div>

                    <div className='enbale_wrapper'>
                        <p>Enable</p>
                        <div onClick={(() => { setenable(!enable) })} className={enable ? 'enable_toggle_wrapper' : 'enable_toggle_wrapper2'} style={enable ? { background: 'var(--primary-color)' } : { background: '#293e5f' }}>
                            {enable ? <i class="fa-solid fa-check"></i> : <i class="fa-solid fa-xmark"></i>}
                            <div className='toggle_circle' ></div>
                        </div>
                    </div>
                    <div className='change_cancel_wrapper'>
                        <button onClick={(() => shiftFunction(0))}>Delete</button>
                        <Button children={'Save'} />
                    </div>
                </form>
            </div>
        </>
    )
}

export default EditCoachShift
