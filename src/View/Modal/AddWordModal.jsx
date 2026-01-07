import React from 'react'
import Input from '../../Components/Input'
import Button from '../../Components/Button'
const AddWordModal = ({setisModal}) => {
  return (
    <>
         <div className='modal_wrapper' onClick={(() => setisModal(false))}></div>
            <div className='modal_div'>
                <h4>Add word</h4>
                <i class="fa-solid fa-xmark" onClick={(() => setisModal(false))}></i>
                <div style={{
                    margin: '25px 0',
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: '20px'
                }}>
                    <Input label={'Word'} required={true} defaultValue={'Anxiety'} />
                </div>

                <Button children={'Add'} styles={{
                    marginLeft: 'auto'
                }} />
            </div>
    </>
  )
}

export default AddWordModal
