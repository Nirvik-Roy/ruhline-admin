import React from 'react'
import Button from '../../Components/Button'
import Input from '../../Components/Input.jsx'
const NewShiftModal = ({shiftFunction}) => {
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
                    <div className='change_cancel_wrapper'>
                        <Button children={'Add'} />
                    </div>
                </form>
            </div>
        </>
    )
}

export default NewShiftModal
