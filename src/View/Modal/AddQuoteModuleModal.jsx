import React from 'react'
import Textarea from '../../Components/Textarea'
import Input from '../../Components/Input'
import Button from '../../Components/Button'
const AddQuoteModuleModal = () => {
    return (
        <>
            <div className='modal_wrapper' onClick={(() => setModal(false))}></div>
            <div className='modal_div'>
                <h4>Add Quote</h4>
                <i class="fa-solid fa-xmark" onClick={(() => setModal(false))}></i>
                <form className='modal_form'>
                    <Textarea label={'Quote'} defaultValue={
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt '
                    } required={true} />

                    <div onClick={(() => setModal(false))} className='change_cancel_wrapper'>
                        <Button children={'Save'} />
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddQuoteModuleModal
