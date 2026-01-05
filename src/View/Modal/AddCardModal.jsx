import React from 'react'
import Button from '../../Components/Button'
import Input from '../../Components/Input'
import Textarea from '../../Components/Textarea'
const AddCardModal = ({ setisModal }) => {
    return (
        <>
            <div className='modal_wrapper' onClick={(() => setisModal(false))}></div>
            <div className='modal_div'>
                <h4>Add card</h4>
                <i class="fa-solid fa-xmark" onClick={(() => setisModal(false))}></i>
                <div style={{
                    margin: '25px 0',
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: '20px'
                }}>

                    <Input label={'Card Name'} required={true} placeholder={'Anxiety'} />
                    <Textarea label={'Description'} required={true} placeholder={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt '} />
                </div>

                <Button children={'Add'} styles={{
                    marginLeft: 'auto'
                }} />
            </div>
        </>
    )
}

export default AddCardModal
