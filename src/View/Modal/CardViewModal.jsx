import React from 'react'
import Input from '../../Components/Input'
import Button from '../../Components/Button'
import Textarea from '../../Components/Textarea.jsx'
const CardViewModal = ({ setModal }) => {
    return (
        <>
            <div className='modal_wrapper' onClick={(() => setModal(false))}></div>
            <div className='modal_div'>
                <h4>Card 1</h4>
                <i class="fa-solid fa-xmark" onClick={(() => setModal(false))}></i>
                <form className='modal_form'>
                    <Input label={'Card Name'} required={true} defaultValue={'Anxiety'} />
                    <Textarea label={'Description'} defaultValue={
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

export default CardViewModal
