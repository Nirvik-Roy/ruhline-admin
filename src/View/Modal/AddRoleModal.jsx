import React from 'react'
import Button from '../../Components/Button'
import Input from '../../Components/Input'
import upload from '../../assets/Vector (8).svg'
import countryData from '../../../countries.json'

const AddRoleModal = () => {
    return (
        <>
            <div className='modal_wrapper' onClick={(() => setCoachModal(false))}></div>
            <div className='modal_div'>
                <h4>Add Role</h4>
                <i class="fa-solid fa-xmark" onClick={(() => setCoachModal(false))}></i>
                <form className='modal_form'>
                    <div className='modal_input_grid_wrapper'>
                        <Input label={'Role Name'} required={true} placeholder={'Role 1'} />
                    </div>

                    <div className='change_cancel_wrapper'>
                        <Button children={'Add'} />
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddRoleModal
