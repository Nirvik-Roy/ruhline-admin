import React from 'react'
import Button from '../../Components/Button'
import Input from '../../Components/Input'
const AddQuoteModal = ({setisModal}) => {
  return (
    <>
         <div className='modal_wrapper' onClick={(() => setisModal(false))}></div>
            <div className='modal_div'>
                <h4>Add Quote</h4>
                <i class="fa-solid fa-xmark" onClick={(() => setisModal(false))}></i>
                <div style={{
                    margin: '25px 0'
                }}>
                    <Input label={'Quote'} required={true} placeholder={'Be who you are and say what you feel'} />
                </div>

                <Button children={'Add'} styles={{
                    marginLeft: 'auto'
                }} />
            </div>
    </>
  )
}

export default AddQuoteModal
