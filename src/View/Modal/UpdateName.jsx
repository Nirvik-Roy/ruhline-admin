import React from 'react'
import Input from '../../Components/Input'
import Button from '../../Components/Button'
const UpdateName = ({ modalFunction }) => {
    return (
        <>
            <div className='modal_wrapper' onClick={(() => modalFunction(0))}></div>
            <div className='modal_div'>
                <h4>Change Profile Picture</h4>
                <i class="fa-solid fa-xmark" onClick={(() => modalFunction(0))}></i>
                <form className='modal_form'>
                    <div className='modal_input_grid_wrapper'>
                        <Input label={'First Name'} required={true} placeholder={'Bidisha'} />
                        <Input label={'Last Name'} required={true} placeholder={'Bhowmick'} />
                    </div>

                    <div className='change_cancel_wrapper'>
                        <button onClick={(() => modalFunction(0))}>Cancel</button>
                        <Button children={'Update'} />
                    </div>
                </form>
            </div>
        </>
    )
}

export default UpdateName
